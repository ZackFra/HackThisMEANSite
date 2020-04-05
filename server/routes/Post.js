const Post = require('./modals/Posts.Modal');
const router = require('express').Router();
const forumTypes = require('./PostTypes');
const jwt = require('jsonwebtoken');

// @route   POST forum post
// @desc    create new post
// @access  protected
router.post('/CreatePost', (req, res) => {

	const {title, content, author, date, forum, token} = req.body;
	if(typeof title !== 'string'
		|| typeof content !== 'string'
		|| typeof author !== 'string'
		|| typeof date !== 'string'
		|| typeof forum !== 'string'
		|| typeof token !== 'string') {
		res.status(500).json('bad request');
	} else if(!forumTypes.includes(forum)) {
		res.status(500).json('bad request');
	}

	const { jwtseed } = process.env;
	jwt.verify(token, jwtseed, (err, data) => {
		if(err) {
			res.status(500).json(err);
		} else {
			Post.create({title, content, author, date, forum}, (err, data) => {
				if(err) {
					res.status(500).json(err);
				} else {
					res.status(200).json({posted: true});
				}
			});
		}
	});
});

// @route   POST get forum posts
// @desc    get posts from a forum
// @access  public
router.post('/GetPosts', (req, res) => {
	const {forum} = req.body;
	if(typeof forum !== 'string') {
		res.status(500).json('bad request');
	} else if(!forumTypes.includes(forum)) {
		res.status(500).json('bad request');
	}

	Post.find({forum: {"$eq": forum}}).sort({forum: -1})
	.then( (data, err) => {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	});
});

module.exports = router;