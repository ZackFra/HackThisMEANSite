const Router = require('express').Router;
const User = require('./modals/User.Modal');

const router = Router();


// @route   POST user
// @desc    Authenticate user + pass
// @access  public
router.post('/login', (req, res) => {
	User.find({user, pass}, (err, data) => {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	});
});

// @route   POST user
// @desc    add new user to db
// @access  public
router.post('/register', async (req, res) => {
	const {user, pass} = req.body;
	if(!user || !pass) {
		res.status(500).json('Invalid parameters: Must have both user and pass');
	}

	const newUser = new User({user, pass});
	const savedUser = await newUser.save();
	if(!savedUser) {
		throw Error('Something went wrong while saving user');
	}

	res.status(200).json('Created User :)');
});

module.exports = router;