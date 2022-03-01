const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');
const Readings = require('../models/connect_model');
const Cards = require('../models/tarot_model');

router.get('/user/:userName', function(request, response) {
  let users = User.getUser(userName);
  let readings = Readings.getReadings(userName);
  let tarotArray = Cards.getCards(userName);

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
  else{
    response.redirect('/error?code=404');
  }
});

router.get('/astrologyEntry', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("user/astrologyEntry");
});

router.get('/astrologyInfo', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("user/astrologyInfo");
});

module.exports = router
