const { Schema, model } = require('mongoose');

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
  	type: String,
  	required: true
  },
  date: {
  	type: Date,
  	required: true
  }
});

const Post = model('post', User1Schema);

module.exports = Post;