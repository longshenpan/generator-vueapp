const express = require('express');
let router = express.Router();

router.get('/getJson', function(req, res) {
	let result = require('../mock/test.json');

	res.send(JSON.stringify(result));
});

module.exports = router;