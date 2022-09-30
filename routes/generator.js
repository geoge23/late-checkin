var express = require('express');
var router = express.Router();

router.get('/generator', function(req, res) {
  return res.render('generator');
});

module.exports = router;
