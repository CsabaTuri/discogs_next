import  mongoose from 'mongoose';
const { Schema } = mongoose;

var fav_label = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  label_id: {
    type: String,
    required: true
  },
  label_name: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});
fav_label.index({ user_id: 1, label_id: 1 , label_name: 1 }, { unique: true });


var FavLabel = mongoose.models.FavLabel ||mongoose.model('FavLabel', fav_label);

module.exports = {
  FavLabel
};