const express = require('express'),
 router = express.Router();
const Callback = require('./axiosAsync');

const User = require('../models/user_model');
const Readings = require('../models/connect_model');
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
/*
router.get('/user/:userName', function(request, response) {
  let users = User.getUser(username);
  let readings = Readings.getReadings(username);
  let tarotArray = Cards.getCards(username);

  // using dynamic routes to specify resource request information
  let userName = request.params.userName;
  let userBday = request.params.userBday;
  let userSun = request.params.userSun;
  let userMoon = request.params.userMoon;
  let userRising = request.params.userRising;

  if(users[userName]){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("userDetails",{
      user: users[userName],
      readings: readings[userName].card,
      tarotArray: tarotArray
   });
 } else{
    response.redirect('/error?code=404');
  }
});
*/

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

router.get('/horoscope', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("user/horoscope", {
    user: request.user,
    data: User.getUser(),
  });
});

router.post('/horoscope', function(request, response) {
  let userID = request.user._json.email;
  let userInfo = User.getUser;
  let sign = userInfo[userID.sunSign];
  let data = await Async.getHoroscope(sign);
  response.send(data);
});

router.post('/astrologyEntry', async function(request, response) {
  let userName = request.body.userName;
  let birthday = request.body.birthDay;
  console.log(request.body.birthDay);
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
