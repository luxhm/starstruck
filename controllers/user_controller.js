const express = require('express'),
router = express.Router();

const axios = require('axios'); //install with npm install axios

const User = require('../models/user_model');
const Cards = require('../models/tarot_model');

function loggedIn(request, response, next){
  if (request.user){
    console.log(request.user);
    next();
  }
  else{
    response.redirect("/login");
  }
}

router.get('/astrologyEntry', loggedIn, function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("user/astrologyEntry", {
    user: request.user,
    data: User.getUser(),
  });
});

router.get('/astrologyInfo', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("user/astrologyInfo", {
    user: request.user,
    data: User.getUser(),
  });
});

router.get('/horoscope', async function(request, response) {

  let userID = request.user._json.email;
  let userInfo = User.getUser();
  let sign = userInfo[userID].sunSign;
  let data = await User.getHoroscope(sign);

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("user/horoscope", {
    user: request.user,
    data: User.getUser(),
    horoscope: data
  });

});

router.post('/astrologyEntry', async function(request, response) {
  let userName = request.body.userName;
  let birthday = request.body.birthDay;
  let sunSign = request.body.sunSign;
  let moonSign = request.body.moonSign;
  let risingSign = request.body.risingSign;
  let userID = request.user._json.email;
  User.saveAstrology(userID, userName, birthday, sunSign, moonSign, risingSign);

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.redirect("astrologyInfo");
});

module.exports = router
