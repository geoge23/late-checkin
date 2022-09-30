var express = require('express');
var router = express.Router();
const { authenticator } = require('otplib')
authenticator.options = { time: 30, digits: 8 }

router.get('/', function(req, res) {
  if (!req.query.code) {
    return res.render('index', { valid: false });
  }
  console.log(authenticator.check(req.query.code, 'MXTFP7AU675MQJQZ'))
  return res.render('index', { valid: true });
});

module.exports = router;
