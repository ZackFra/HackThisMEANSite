const { Schema, model } = require('mongoose');

// Create Schema
const User1Schema = new Schema({
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

const Users = model('user1', User1Schema);

module.exports = Users;
