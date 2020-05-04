const router = require('express').Router();
const sanitizeHTML = require('sanitize-html');


sanitizeHTML.defaults.allowedTags = [];
sanitizeHTML.defaults.allowedAttributes = {};

// @route   POST poem
// @desc   	return sanitized body + message, intentionally broken
// @access  public
router.post('/Post', (req, res) => {
	const payload = req.body;

	if(payload.title) {
		payload.title = sanitizeHTML(payload.title);	
	}
	if(payload.message) {
		payload.message = sanitizeHTML(payload.message);
	}

	return res.status(200).json(payload);
});

module.exports = router;