var express = require('express');
var router = express.Router();

router.get('/generator', function(req, res) {
  return res.render('generator', {secret: process.env.SECRET, period: process.env.PERIOD || 10});
});

module.exports = router;
