const Post = require('./modals/Posts.Modal');
const router = require('express').Router();
const forumTypes = require('./PostTypes');

// @route   POST forum post
// @desc    create new post
// @access  protected
router.post('/CreatePost', (req, res) => {
	const {title, content, author, date, forum} = req.body;
	if(!forumTypes.includes(forum)) {
		res.status(500).json('bad request');
	}

	Post.create({title, content, author, date, forum}, (err, data) => {
		if(err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({posted: true});
		}
	});
})

// @route   POST get forum posts
// @desc    get posts from a forum
// @access  private
router.post('/GetPosts', (req, res) => {
	const {forum} = req.body;
	if(!forumTypes.includes(forum)) {
		res.status(500).json('bad request');
	}
	Post.find({forum: {"$eq": forum}}).sort({forum: -1})
	.then( (data, err) => {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	});
});

module.exports = router;