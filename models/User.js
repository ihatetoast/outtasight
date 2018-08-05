const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//no other deets. only for rego and auth
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//var that is mongoose model called users and uses the UserSchema

const User = mongoose.model('users', UserSchema);
module.exports = User;
