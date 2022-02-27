const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');

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
  /*
  let opponentName = request.params.opponentName;
  let opponent = Opponent.getOpponent(opponentName);

  if(opponent){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("opponent/opponentDetails",{
      opponent: opponent
    });
  }*/
  else{
    response.redirect('/error?code=404');
  }
});

module.exports = router
