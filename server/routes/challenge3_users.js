const Router = require('express').Router;
const User = require('./modals/Users3.Modal');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const router = Router();


// @route   POST user
// @desc    Authenticate user + pass
// @access  public
router.post('/Login', (req, res) => {
	const {user, pass} = req.body;

	if(!user || !pass) {
		res.status(500).json('bad request');
		return ;
	} else if(typeof user !== 'string' || typeof pass != 'string') {
		res.status(500).json('bad request');
		return ;
	}
	
	User.find({user: {$eq: user}, pass: {$eq: pass}}, (err, data) => {
		if(err) {
			res.status(500).json(err);
		} else {
			if( data.length === 1 ) { 
				jwt.sign({user}, 'secret', (err, token) => {
					if(err) {
						res.status(500).json('bad request');
					} else {
						res.status(200).json(token);
					}
				});
			} else {
				res.status(404).json('User not found');
			}
		}
	});
});

// @route   POST user
// @desc    User registration
// @access  public
router.post('/Register', (req, res) => {
	const {user, pass} = req.body;

	User.create({user, pass}, (err, data) => {
		if(err) {
			console.log(err);
			res.status(500).json(false);
		}

		res.status(200).json(true);
	});
});

// @route   POST user
// @desc    change user password
// @access  public
router.post('/ChangePass', (req, res) => {
	const {user, newPass, token} = req.body;
	jwt.verify(token, 'secret', (err, decoded) => {
		if(err) {
			console.log(err);
			res.status(500).json(false);
		}

		User.findOneAndUpdate( {user: {$eq: user}}, {pass: newPass})
		.then( data => res.status(200).json(true) )
		.catch( err => res.status(500).json(false) );
	});
})

module.exports = router;