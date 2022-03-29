const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
  router = express.Router();

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

//tarot
router.get('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/drawCard", {
    user: request.user,
    cards: Cards.getCards(),
  });
});

router.get('/cardDrawn', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let tarotCards = JSON.parse(fs.readFileSync('data/tarotCards.json'));
  let readings = JSON.parse(fs.readFileSync('data/readings.json'));

  let tarotArray = [];
  for(i in tarotCards){
    tarotArray.push(i);
  }

  let randomNum = Math.floor(Math.random()*11)+1;
  randomCard = tarotArray[randomNum];
  let userEmail = request.user._json.email;

  if (userEmail){
    if (userEmail in readings) {
      readings[userEmail].card.push(randomCard);
      fs.writeFileSync('data/readings.json', JSON.stringify(readings));
    }
    else {
      let newReading = {
        "name": userEmail,
        "card": [randomCard],
      }
      readings[userEmail] = newReading;
      fs.writeFileSync('data/readings.json', JSON.stringify(readings));
    }
  }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/cardDrawn", {
    user: request.user,
    cards: Cards.getCards(),
    randomCard: randomCard
  });
});

router.post('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("tarot/cardDrawn", {
    user: request.user,
    cards: Cards.getCards(),
  });
});

router.post('/cardDrawn', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("tarot/visualize", {
    user: request.user,
    cards: Cards.getCards(),
    readings: Readings.getReadings()
  });
});

//visualize
router.post('/visualize', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("tarot/postVisualization");
});

router.get('/visualize', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/visualize", {
    user: request.user,
    cards: Cards.getCards(),
    readings: Readings.getReadings()
  });
});

router.get('/postVisualization', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/postVisualization");
});

module.exports = router
