const Router = require('express').Router;
const User = require('./modals/User.Modal');
const crypto = require('crypto');
const router = Router();


// @route   POST user
// @desc    Authenticate user + pass
// @access  private
router.post('/Authenticate', (req, res) => {
	const {user, pass} = req.body;

	if(typeof(user) !== 'string' || typeof(pass) !== 'string') {
		res.status(500).json('Invalid parameters: Only accepts strings');
	} 

	let hash = crypto
		.createHmac('sha256', 'pass')
		.update(pass)
		.digest('hex');
	
	User.find({user, "pass": hash}, (err, data) => {
		if(err) res.status(500).json(err);
		else if (data.length > 0) res.status(200).json(data);
		else res.status(500).json('User Not Found');
	});
});

// @route   POST user
// @desc    add new user to db
// @access  private
router.post('/Register', (req, res) => {
	const {user, pass} = req.body;
	if(!user || !pass) {
		res.status(500).json('Invalid parameters: Must have both user and pass');
	} else if(typeof(user) !== 'string' || typeof(pass) !== 'string') {
		res.stuatus(500).json('Invalid parameters: Only accepts strings');
	}
	
	let hash = crypto
		.createHmac('sha256', 'pass')
		.update(pass)
		.digest('hex')

	User.create({user, "pass": hash}, (err, data) => {
		if(err) res.status(500).json(err);
		res.status(200).json(data);
	});
});

module.exports = router;