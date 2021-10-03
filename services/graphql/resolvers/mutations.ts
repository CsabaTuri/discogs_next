import  jwt from "jsonwebtoken";
import  { ApolloError } from "apollo-server-errors";
const { FavArtist } = require("../mongodb/models/fav_artists");
const { FavMaster } = require("../mongodb/models/fav_masters");
const { FavRelease } = require("../mongodb/models/fav_releases");
const { FavLabel } = require("../mongodb/models/fav_label");
const { User } = require("../mongodb/models/user");
require('dotenv').config();
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
const mutations = {
  delete_acc: async (_parent:any, _args:any, context:any) => {
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      await User.deleteOne({
        _id: user_id,
      });
      await FavArtist.deleteMany({
        user_id: user_id,
      });
      await FavLabel.deleteMany({
        user_id: user_id,
      });
      await FavMaster.deleteMany({
        user_id: user_id,
      });
      await FavRelease.deleteMany({
        user_id: user_id,
      });
      return true
    } catch (err) {
      console.log(err)
      throw new ApolloError("Unknow server error", "401");
    }
  },
  add_artist_to_favorites: async (_parent:any, args:any, context:any) => {
    const { artist_id, artist_name } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });

      const artist = new FavArtist({
        user_id,
        artist_id,
        artist_name,
      });
      await artist.save();
      return true
    } catch (err:any) {
      if(err.code){
        throw new ApolloError("Unknow server error", "401");
      }
      throw new ApolloError("Unknow server error", "401");
    }
  },
  remove_artist_from_favorites: async (_parent:any, args:any, context:any) => {
    const { artist_id } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      await FavArtist.deleteOne({
        artist_id: artist_id,
        user_id: user_id,
      });
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
  add_label_to_favorites: async (_parent:any, args:any, context:any) => {
    const { label_id, label_name } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const label = new FavLabel({
        user_id,
        label_id,
        label_name,
      });
      await label.save();
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
  remove_label_from_favorites: async (_parent:any, args:any, context:any) => {
    const { label_id } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      await FavLabel.deleteOne({
        label_id: label_id,
        user_id: user_id,
      });
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
  add_master_to_favorites: async (_parent:any, args:any, context:any) => {
    const { master_id, master_name } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const master = new FavMaster({
        user_id,
        master_id,
        master_name,
      });
      await master.save();
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
  remove_master_from_favorites: async (_parent:any, args:any, context:any) => {
    const { master_id } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      await FavMaster.deleteOne({
        master_id: master_id,
        user_id: user_id,
      });
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
  add_release_to_favorites: async (_parent:any, args:any, context:any) => {
    const { release_id, release_name } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      const release = new FavRelease({
        user_id,
        release_id,
        release_name,
      });
      await release.save();
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
  remove_release_from_favorites: async (_parent:any, args:any, context:any) => {
    const { release_id } = args;
    const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
    const decoded = jwt.decode(token);
    const {user_id}:any = decoded;
    try {
      const token = context.req.headers.authorization.replace(/^Bearer\s/, "");
      jwt.verify(token, privateKey, { algorithms: ["RS256"] });
      await FavRelease.deleteOne({
        release_id: release_id,
        user_id: user_id,
      });
      return true
    } catch (err) {
      throw new ApolloError("Unknow server error", "401");
    }
  },
};
module.exports = mutations;
