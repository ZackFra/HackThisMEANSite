const User = require('./modals/User.Modal');
const crypto = require('crypto');
const router = require('express').Router();


// @route   POST user
// @desc    Authenticate user + pass
// @access  private
router.post('/Authenticate', (req, res) => {
	const {user, pass} = req.body;
	const {hash, useed, pseed} = process.env;

	if(typeof(user) !== 'string' || typeof(pass) !== 'string') {
		return res.status(500).json('Invalid parameters: Only accepts strings');
	} 

	const userHash = crypto
		.createHmac(hash, useed)
		.update(user)
		.digest('hex');

	const passHash = crypto
		.createHmac(hash, pseed)
		.update(pass)
		.digest('hex');
	
	User.findOne({'user': userHash, "pass": passHash}, (err, data) => {
		if(data) {
			res.status(200).json(true);
		} else {
			res.status(404).json(err);
		}
	});
});

// @route   POST user
// @desc    add new user to db
// @access  private
router.post('/Register', (req, res) => {
	const {user, pass, email} = req.body;
	const {hash, useed, pseed, eseed} = process.env;
	if(!user || !pass) {
		res.status(500).json('Invalid parameters: Must have both user and pass');
	} else if(typeof(user) !== 'string' || typeof(pass) !== 'string') {
		res.status(500).json('Invalid parameters: Only accepts strings');
	}

	const userHash = crypto
		.createHmac(hash, useed)
		.update(user)
		.digest('hex');

	const passHash = crypto
		.createHmac(hash, pseed)
		.update(pass)
		.digest('hex');

	const emailHash = crypto
		.createHmac(hash, eseed)
		.update(email || 'NA')
		.digest('hex')
	

	User.create({'user': userHash, 'pass': passHash, 'email': emailHash}, (err, data) => {
		if(err) res.status(500).json(err);
		res.status(200).json(data);
	});
});

module.exports = router;