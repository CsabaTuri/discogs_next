import  mongoose from 'mongoose';
const { Schema } = mongoose;

var fav_release = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  release_id: {
    type: String,
    required: true
  },
  release_name: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});
fav_release.index({ user_id: 1, release_id: 1 , release_name: 1 }, { unique: true });


var FavRelease = mongoose.models.FavRelease || mongoose.model('FavRelease', fav_release);

module.exports = {
  FavRelease
};