var express = require('express');
var router = express.Router();
const { authenticator } = require('otplib')
authenticator.options = { time: 30, digits: 6, encoding: 'hex', window: 4 }

router.get('/', function(req, res) {
  if (!req.query.code) {
    return res.render('index', { valid: false });
  }
  console.log(authenticator.generate('LEMGUTJJNNDAIBJ7'), authenticator.allOptions())
  console.log(req.query.code, authenticator.check(req.query.code, 'LEMGUTJJNNDAIBJ7'))
  return res.render('index', { valid: true });
});

module.exports = router;
