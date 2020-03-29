const { Schema, model } = require('mongoose');

// Create Schema
const UserSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  },
  email: {
  	type: String,
  	required: false,
  	unique: true
  }
});

const User = model('user', UserSchema);

module.exports = User;
