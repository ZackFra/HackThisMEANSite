const Router = require('express').Router;
const User = require('./modals/Users1.Modal');
const crypto = require('crypto');

const router = Router();


// @route   POST user
// @desc    Authenticate user + pass
// @access  public
// @note    open to injections
router.post('/login', (req, res) => {
	const {user, pass} = req.body;
	
	User.find({user, pass}, (err, data) => {
		if(err) res.status(500).json(err);
		else res.status(200).json(data);
	});
});


module.exports = router;