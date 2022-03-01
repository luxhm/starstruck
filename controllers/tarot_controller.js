const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');

//connect
router.get('/connect', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/connect");
});

//tarot
router.get('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/drawCard");
});

router.get('/cardDrawn', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("tarot/cardDrawn");
});

router.post('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("tarot/cardDrawn");
});

router.post('/cardDrawn', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("tarot/visualize");
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
