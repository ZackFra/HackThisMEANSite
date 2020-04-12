const { Schema, model } = require('mongoose');

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Array,
    required: true
  },
  author: {
  	type: String,
  	required: true
  },
  date: {
  	type: String,
  	required: true
  },
  forum: {
  	type: String,
  	required: true
  }
});

const Post = model('post', PostSchema);

module.exports = Post;