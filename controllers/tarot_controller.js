const express = require('express'),
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
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/cardDrawn", {
    user: request.user,
    cards: Cards.getCards(),
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
  response.render("tarot/visualize");
});

router.get('/postVisualization', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/postVisualization");
});

module.exports = router
