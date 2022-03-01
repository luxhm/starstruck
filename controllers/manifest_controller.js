const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');

//manifestations
router.get('/loadManifestations', function(request, response){
  let name = request.query.manifestName;
  let manifest = request.query.manifest;
  if(name && manifest!=""){

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("manifest/loadManifestations",{
        name: name,
        manifest: manifest
  });
  }
  else {
    response.status(400);
    response.setHeader('Content-Type', 'text/html')
    response.redirect('/error?code=404');
  }
});

router.get('/manifest', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("manifest/manifest");
});

module.exports = router
