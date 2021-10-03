import  mongoose from 'mongoose';
const { Schema } = mongoose;

var fav_master = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  master_id: {
    type: String,
    required: true
  },
  master_name: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});
fav_master.index({ user_id: 1, master_id: 1 , master_name: 1 }, { unique: true });


var FavMaster = mongoose.models.FavMaster || mongoose.model('FavMaster', fav_master);

module.exports = {
  FavMaster
};