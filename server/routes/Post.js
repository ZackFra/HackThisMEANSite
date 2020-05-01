const Post = require('./modals/Posts.Modal');
const router = require('express').Router();
const forumTypes = require('./PostTypes');
const jwt = require('jsonwebtoken');

// @route   POST forum post
// @desc    create new post
// @access  protected
router.post('/CreatePost', (req, res) => {

	const {title, content, author, forum, token} = req.body;
	if(typeof title !== 'string'
		|| typeof content !== 'string'
		|| typeof author !== 'string'
		|| typeof forum !== 'string'
		|| typeof token !== 'string') {
		res.status(500).json('bad request');
	} else if(!forumTypes.includes(forum)) {
		res.status(500).json('bad request');
	}

	// verifies login credentials
	// if varified, attempts to create post
	// if created, return the post
	const { jwtseed } = process.env;
	jwt.verify(token, jwtseed, (err, data) => {
		if(err) {
			res.status(500).json('bad request');
		} else {
			const date = (new Date()).toLocaleString();
			Post.create({title, content: [[author, content, date]], author, date, forum}, (err, data) => {
				if(err) {
					res.status(500).json('bad request');
				} else {
					res.status(200).json(data);
				}
			});
		}
	});
});

// @route   POST update forum post
// @desc    create new forum post
// @access  public
router.post('/UpdatePost', (req, res) => {
	// post is the post to update, user is the user,
	// content is the new content to be added,
	// curr is the current content
	const { jwtseed } = process.env;
	const { id, user, content, token} = req.body;
	if(typeof id !== 'string' || typeof user !== 'string' || typeof content !== 'string' || typeof token !== 'string') {
		res.status(500).json('bad request');
		return ;
	}

	jwt.verify(token, jwtseed, (err, data) => {
		if(err) {
			console.log(err);
			res.status(500).json('bad request');
		} else {
			const date = (new Date()).toLocaleString();
			const newMessage = [data.user, content, date];
			Post.findByIdAndUpdate(id, {$push: {content: newMessage}})
			.then( data => { res.status(200).json(newMessage)})
			.catch( err => {
				res.status(500).json('bad request');
			});
		}
	});
});

// @route   POST get forum posts
// @desc    get posts from a forum
// @access  public
router.post('/GetPosts', (req, res) => {
	const { forum } = req.body;
	if(typeof forum !== 'string') {
		res.status(500).json('bad request');
	} else if(!forumTypes.includes(forum)) {
		res.status(500).json('bad request');
	}

	Post.find({forum: {$eq: forum}}).sort({date: 'desc'})
	.then( (data, err) => {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	});
});

module.exports = router;