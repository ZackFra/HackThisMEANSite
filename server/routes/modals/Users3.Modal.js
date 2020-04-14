const { Schema, model } = require('mongoose');

// Create Schema
const User3Schema = new Schema({
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

const Users = model('user3', User3Schema);

module.exports = Users;
