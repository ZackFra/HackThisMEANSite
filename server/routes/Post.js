const Post = require('./modals/Post.Modal');
const router = require('express').Router();

// @route   POST forum post
// @desc    create new post
// @access  protected
router.post('/Post', (req, res) => {
	const {title, body, author, date, forum} = req;
	Post.create({title, body, author, date, forum})
	.then( (err, data) => {
		if(data) {
			res.status(200).json({posted: true});
		}
		else {
			res.status(500).json({err: err});
		}
	})
})

// @route   POST forum post
// @desc    get posts from a forum
// @access  private
router.get('/Post', (req, res) => {
	Post.find({forum: {"$eq": req.forum}}).sort({forum: -1})
	.then((err, data) => {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	})
})