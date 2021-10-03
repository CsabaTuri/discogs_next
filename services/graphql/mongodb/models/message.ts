import  mongoose from 'mongoose';
const { Schema } = mongoose;

var message = new Schema({
  user: {
    type: String,
    required: true,
    unique: false
  },
  msg: {
    type: String,
    required: true,
    unique: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});


var Message = mongoose.models.Message || mongoose.model('Message', message);

module.exports = {
  Message
};