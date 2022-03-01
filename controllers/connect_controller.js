const express = require('express'),
  router = express.Router();

const Readings = require('../models/connect_model');

//connect
router.get('/connect', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("connect/connect");
});

module.exports = router
