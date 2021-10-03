import mongoose from 'mongoose';
const { Schema } = mongoose;
var fav_artist = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  artist_id: {
    type: String,
    required: true
  },
  artist_name: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});
fav_artist.index({ user_id: 1, artist_id: 1 , artist_name: 1 }, { unique: true });


var FavArtist = mongoose.models.FavArtist || mongoose.model('FavArtist', fav_artist);

module.exports = {
  FavArtist
};