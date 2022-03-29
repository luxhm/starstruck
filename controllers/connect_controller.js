const express = require('express'),
  router = express.Router();

const Readings = require('../models/connect_model');

function loggedIn(request, response, next){
  if (request.user){
    console.log(request.user);
    next();
  }
  else{
    response.redirect("/login");
  }
}

//connect
router.get('/connect', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("connect/connect",{
    user: request.user
  });
});

module.exports = router
