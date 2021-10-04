import  jwt from "jsonwebtoken";
import  { ApolloError } from "apollo-server-errors";
const { FavArtist } = require("../mongodb/models/fav_artists");
const { FavMaster } = require("../mongodb/models/fav_masters");
const { FavRelease } = require("../mongodb/models/fav_releases");
const { FavLabel } = require("../mongodb/models/fav_label");
const { User } = require("../mongodb/models/user");
const fs = require('fs');
var privateKey = fs.readFileSync('private.key');
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
