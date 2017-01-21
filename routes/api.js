var express = require('express');
var router = express.Router();

router.get('/bar/search/:query', function(req, res, next) {
	let query = req.params.query
	console.log(query)
	res.json(query)
});

module.exports = router;
