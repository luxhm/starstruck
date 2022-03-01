const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');

//connect
router.get('/connect', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("connect");
});

//tarot
router.get('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("drawCard");
});

router.get('/cardDrawn', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("cardDrawn");
});

router.post('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("cardDrawn");
});

router.post('/cardDrawn', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("visualize");
});

//visualize
router.post('/visualize', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.redirect("postVisualization");
});

router.get('/visualize', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("visualize");
});

router.get('/postVisualization', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("postVisualization");
});

module.exports = router
