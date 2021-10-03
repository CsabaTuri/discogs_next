import jwt from "jsonwebtoken";
import { ApolloError, AuthenticationError } from "apollo-server-errors";
const axios = require("axios");
const bcrypt = require("bcrypt");
const { User } = require("../mongodb/models/user");
const { FavArtist } = require("../mongodb/models/fav_artists");
const { FavMaster } = require("../mongodb/models/fav_masters");
const { FavRelease } = require("../mongodb/models/fav_releases");
const { FavLabel } = require("../mongodb/models/fav_label");
const { Message } = require("../mongodb/models/message");
require('dotenv').config();
console.log(process.env.PRIVATE_KEY)
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHCTviWIVte2drMK3mqMR369zokb3m+/ZkfHNP1e78PA/ZqWVkyE
c53eu/qjRZl7nUH+1sk54feArlN7Q31oq2RnNOpxOYtHbrMWI5mvyuC8clne2wRN
S2xYlDJyfj5LiIcd9B1GvnONUaNzrePfXiG/xl/qasE3tyJkaRhElzVpAgMBAAEC
gYBLmp0vfaG82thao6j9a1o0fuou4F2BNMxO1jT7F//zui9W2zH3z1gKJOSfjXkX
e5IAGVJL76iW3H+2puiLV3kKXRS4DT7WZyMfov88+r7HugpAVncuz/dmFXzDTb8h
e3F5cv8+1hfSvfvZsfZQf6ZOZFi0Bf+22HB1iUDzNUKnAQJBAMY9f10upHcOCbsx
tyx0zCnAcBmTBRO1yYlZxJsrdDOLGsKXbQPdZQioIMAy1zBGk6cDGnqLcw+UWD72
Gl4fDgkCQQCRYLx34INmLXLrE9pksk8syOu/98BdlNVAIetx1dDI/bEC/Q4hlPR/
GSFelt30ZvGYXSHKJTPgig4l8lK4dMRhAkEAqBm757NGiSIhRFg7AHqmKX1iUX1m
37jWBh9V5VKqvY5mib3IFm/lXbrb0r8J1Ij0abnq+SFI11wunG0qHMfuqQJAJ59b
/rg8V+7vMU756RQILEaeqnWWAmt8K7yS9TW3b/Bk/FGINnLoqHNq+uLXn7MnCcXo
XbYCC6LU9Fa1YPzCQQJAR70bxh2i3l4s7wHt8YyPHWT/vPJPDcqDImqXfNynTbhg
cMATuu8ucMOP6QBf9jzOsZ2FrShNm9P4F9EN2VHEFQ==
-----END RSA PRIVATE KEY-----`;
const saltRounds = 10;
const queries = {
  login: async (_parent: any, args: any, _context: any, _info: any) => {
    const user_name = args.user_name;
    const password = args.password;

    if (user_name && password) {
      try {
        const results = await User.find({$or:[{ user_name: user_name },{ email: user_name }]}).exec();

        const comparison = await bcrypt.compare(password, results[0].password);
        if (comparison) {
          const userData = {
            user_name: results[0].user_name,
            email: results[0].email,
            first_name: results[0].first_name,
            last_name: results[0].last_name,
            user_id: results[0].id,
          };

          const token = jwt.sign(userData, privateKey, {
            algorithm: "RS256",
          });
          return { token: token, userData: userData };
        } else {
          throw new AuthenticationError("Not login");
        }
      } catch (err: any) {
        throw new AuthenticationError("User not found!");
      }
    } else {
      throw new ApolloError("Please enter email and Password!", "401");
    }
  },
  registration: async (_parent: any, args: any, _context: any, _info: any) => {
    const user_name = args.user_name;
    const first_name = args.first_name;
    const last_name = args.last_name;
    const email = args.email;
    const password = args.password;

    if (first_name && last_name && email && password) {
      const passwordhash = await bcrypt.hash(password, saltRounds);
      try {
        const user = new User({
          user_name,
          first_name,
          last_name,
          email,
          password: passwordhash,
        });
        // Create new user
        const usercreated = await user.save();
        return usercreated;
      } catch (err: any) {
        throw new ApolloError(err.code, "401");
      }
    } else {
      throw new ApolloError("data_incomplete", "401");
    }
  },
  user: async (_parent: any, _args: any, context: any, _info: any) => {
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const decoded = jwt.decode(token);
      const { email }: any = decoded;
      const results = await User.find({ email: email }).exec();
      const userData = {
        user_name: results[0].user_name,
        email: results[0].email,
        first_name: results[0].first_name,
        last_name: results[0].last_name,
        user_id: results[0].id,
      };
      return { token: token, userData: userData };
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  users: async (_parent: any, _args: any, context: any, _info: any) => {
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const results = await User.find({}, {user_name: 1,first_name: 1,last_name: 1,email: 1,_id:1} )
      return results
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  message: async (_parent: any, args: any, context: any, _info: any) => {
    const { per_page } = args;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const results = await Message.find().sort({ 'date': -1 }).limit(per_page).exec();
      return results
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  releases: async (_parent: any, args: any, context: any) => {
    const id = args.id;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/releases/${id}`,
      })
        .then(function (res: any) {
          //handle success
          return res.data;
        })
        .catch(function (err: any) {
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  master: async (_parent: any, args: any, context: any) => {
    const id = args.id;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/masters/${id}`,
      })
        .then(function (res: any) {
          //handle success
          console.log(res.data)
          return res.data;
        })
        .catch(function (err: any) {
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  label: async (_parent: any, args: any, context: any) => {
    const id = args.id;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/labels/${id}`,
      })
        .then(function (res: any) {
          //handle success
          return res.data;
        })
        .catch(function (err: any) {
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  artistReleases: async (_parent: any, args: any, context: any) => {
    const { artist_id, page, per_page, sort, sort_order } = args;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      return await axios({
        method: "get",
        url: `https://api.discogs.com/artists/${artist_id}/releases?&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}&page=${page}&per_page=${per_page}&sort=${sort}&sort_order=${sort_order}`,
      })
        .then(function (res: any) {
          //handle success
          console.log(res.data)
          return res.data;
        })
        .catch(function (err: any) {
          console.log(err)
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err);
      throw new ApolloError("database error", "401");
    }
  },
  labelReleases: async (_parent: any, args: any, context: any) => {
    const { label_id, page, per_page } = args;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/labels/${label_id}/releases?page=${page}&per_page=${per_page}`,
      })
        .then(function (res: any) {
          //handle success
          return res.data;
        })
        .catch(function (err: any) {
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  search: async (_parent: any, args: any, context: any) => {
    const {
      type = "",
      query = "",
      title = "",
      release_title = "",
      credit = "",
      artist = "",
      anv = "",
      label = "",
      genre = "",
      style = "",
      country = "",
      year = "",
      format = "",
      catno = "",
      barcode = "",
      track = "",
      submitter = "",
      contributor = "",
      page = "",
      per_page = "",
    } = args;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/database/search?&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}&q=${query}&type=${type}&title=${title}&release_title=${release_title}&credit=${credit}&artist=${artist}&anv=${anv}&label=${label}&genre=${genre}&style=${style}&country=${country}&year=${year}&format=${format}&catno=${catno}&barcode=${barcode}&track=${track}&submitter=${submitter}&contributor=${contributor}&page=${page}&per_page=${per_page}`,
      })
        .then(function (res: any) {
          //handle success
          return res.data;
        })
        .catch(function (err: any) {
          console.log(err.message);
          //handle error
          throw new ApolloError("database error", "401");
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  styles: async (_parent: any, args: any, context: any) => {
    const { style, page, per_page } = args;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/database/search?style=${style}&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}&page=${page}&per_page=${per_page}`,
      })
        .then(function (res: any) {
          //handle success
          return res.data;
        })
        .catch(function (err: any) {
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  genres: async (_parent: any, args: any, context: any) => {
    const { genre, page, per_page } = args;

    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      return await axios({
        method: "get",
        url: `https://api.discogs.com/database/search?genre=${genre}&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}&page=${page}&per_page=${per_page}`,
      })
        .then(function (res: any) {
          //handle success
          return res.data;
        })
        .catch(function (err: any) {
          //handle error
          return err;
        });
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  artist: async (_parent: any, args: any, context: any) => {
    const { artist_id } = args;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");

      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const res = await axios({
        method: "get",
        url: `https://api.discogs.com/artists/${artist_id}`,
      });
      return res.data;
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  getFavoritesArtist: async (_parent: any, _args: any, context: any) => {
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const decoded = jwt.decode(token);
      const { user_id }: any = decoded;
      let artist_ids = await FavArtist.find(
        { user_id: user_id }
      ).exec();
      return artist_ids;
    } catch (err: any) {
      throw new ApolloError("database error", "401");
    }
  },
  getFavoritesMaster: async (_parent: any, _args: any, context: any) => {
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const decoded = jwt.decode(token);
      const { user_id }: any = decoded;
      let master_ids = await FavMaster.find(
        { user_id: user_id }
      ).exec();

      return master_ids
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  getFavoritesRelease: async (_parent: any, _args: any, context: any) => {
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const decoded = jwt.decode(token);
      const { user_id }: any = decoded;
      let release_ids = await FavRelease.find(
        { user_id: user_id }
      ).exec();

      return release_ids
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
  getFavoritesLabel: async (_parent: any, _args: any, context: any) => {
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const decoded = jwt.decode(token);
      const { user_id }: any = decoded;
      let label_ids = await FavLabel.find(
        { user_id: user_id }
      ).exec();

      return label_ids
    } catch (err: any) {
      console.log(err.message);
      throw new ApolloError("database error", "401");
    }
  },
};

module.exports = queries;
