var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const { TOTP } = require('otpauth');
const SECRET = process.env.SECRET
const WINDOW = parseInt(process.env.WINDOW) || 1

const totp = new TOTP({
  algorithm: 'SHA1',
	digits: 8,
	period: process.env.PERIOD || 10,
	secret: SECRET
});

router.get('/', function(req, res) {
  if (req.query.code && totp.validate({
    token: req.query.code,
    window: WINDOW
  }) != null) {
    // If the user has a valid code, set a cookie for the day and show
    // them their late pass
    res.cookie('pass', generateHmacCookie(), {maxAge: 86400000});
    return res.render('index', { valid: true, date: generateDateStrings() });
  } else if (
    req.cookies.pass && 
    /[0-9]+:[0-9a-f]+/.test(req.cookies.pass)
  ) {
    // If the user has a cookie, check if it's valid for the current day
    // If so, show their late pass
    // The regex ensures the cookie matches the HMACCookie schema
    const [cookieDate, _] = req.cookies.pass.split(':');
    // validates signature and checks if cookie is from today
    if (
      validateHmacCookie(req.cookies.pass) && 
      isSameDay(
        new Date(parseInt(cookieDate)), 
        new Date()
      )
    ) {
      return res.render('index', { valid: true, date: generateDateStrings(new Date(parseInt(cookieDate))) });
    } else {
      // If not, delete the cookie and show the error screen
      res.clearCookie('pass');
      return res.render('index', { valid: false });
    }
  } else {
    // Otherwise, show them the invalid page
    return res.render('index', { valid: false });
  }
});

module.exports = router;

// Function that checks if dates are on the same day
// Ensures that the pass was issued on the same actual date as the current date
// rather than just within a day of checking 
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

//generate a HMAC cookie with the current date or a supplied date
function generateHmacCookie(date = new Date()) {
  const hmac = hmacSha1(date.getTime().toString());
  return `${date.getTime()}:${hmac}`;
}

//validate a HMAC cookie with the application secret
function validateHmacCookie(cookie) {
  const [date, hmac] = cookie.split(':');
  return hmac === hmacSha1(date);
}

//generate a SHA1 hmac string from another string
function hmacSha1(data) {
  const hmac = crypto.createHmac('sha1', SECRET);
  hmac.update(new Buffer.from(data));
  return hmac.digest('hex');
}

//generates date string formats for use in the server-side render
function generateDateStrings(date = new Date()) {
  const hrs = date.getHours()
  const mins = date.getMinutes()
  //adds padding to the minutes (i.e. 1 hrs 2 mins to 1:02 instead of 1:2)
  const minString = mins.toString().padStart(2, '0')
  const meridian = hrs < 12 ? 'AM' : 'PM';
  const timeString = `${hrs % 12}:${minString} ${meridian}`;
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthString = months[date.getMonth()];
  const day = date.getDate();
  const dateString = `${monthString} ${day}, ${date.getFullYear()}`
  return { dateString, timeString };
}
