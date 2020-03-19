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
});

const User = model('user', UserSchema);

module.exports = User;
