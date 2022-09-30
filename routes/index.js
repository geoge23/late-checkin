var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (!req.query.code) {
    return res.render('index', { valid: false });
  }
  return res.render('index', { valid: true });
});

module.exports = router;
