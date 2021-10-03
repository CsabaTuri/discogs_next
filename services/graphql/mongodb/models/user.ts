import  mongoose from 'mongoose';
const { Schema } = mongoose;

var user = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});


var User = mongoose.models.User || mongoose.model('User', user);

module.exports = {
  User
};