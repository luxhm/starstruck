//..............Include Express..................................//
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

let randomCard;

//app.use(require('./controllers/index_controller'));

//.............Define server routes..............................//
//Express checks routes in the order in which they are defined


//index /login
app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index");
});

app.post('/', function(request, response) {
  let userName = request.body.userName;
  let userBday = request.body.userBday;
  let userSun = request.body.userSun;
  let userMoon = request.body.userMoon;
  let userRising = request.body.userRising;

  if(userName&&userBday){
    let users = JSON.parse(fs.readFileSync('data/users.json'));
    let newUser ={
      "name": userName.trim(""),
      "birthday": userBday,
      "sunSign": userSun,
      "moonSign": userMoon,
      "risingSign": userRising,
    }
    users[userName] = newUser;
    fs.writeFileSync('data/users.json', JSON.stringify(users));

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect("tarot");
  }else{
    response.status(400);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"400"
    });
  }
});

/*
=======
//about
app.get('/about', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about");
});

>>>>>>> Stashed changes
//old tarot
app.get('/tarot', function(request, response) {
    let users = JSON.parse(fs.readFileSync('data/users.json'));
    let tarotCards = JSON.parse(fs.readFileSync('data/tarotCards.json'));
    let tarotArray = [];

    for(i in tarotCards){
      tarotArray.push(i);
    }

    let randomNum = Math.floor(Math.random()*11)+1;
    randomCard = tarotArray[randomNum];

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("tarot", {
      users: users,
      tarotCards: tarotCards,
      randomCard: randomCard
    });
});


app.post('/tarot', function(request, response) {
  let name = request.body.name;
  let readings = JSON.parse(fs.readFileSync('data/readings.json'));
  let emotions = JSON.parse(fs.readFileSync('data/readings.json'));
  let users = JSON.parse(fs.readFileSync('data/users.json'));

  if (name){
    if (name in readings) {
      readings[name].card.push(randomCard);
      readings[name].emotion.push(request.body.emotion);
      fs.writeFileSync('data/readings.json', JSON.stringify(readings));
    }
    else {
      let newReading = {
        "name": name,
        "sign": users[name].sunSign,
        "card": [randomCard],
        "emotion": [request.body.emotion]
      }
      readings[name] = newReading;
      fs.writeFileSync('data/readings.json', JSON.stringify(readings));
    }

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("readings");
  }
  else{
    response.status(400);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"400"
    });
  }
});

//readings
app.get('/readings', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let readings = JSON.parse(fs.readFileSync('data/readings.json'));
  let tarots = JSON.parse(fs.readFileSync('data/tarotCards.json'));

  let readingsArray = [];
  for(let name in readings){
    readingsArray.push(readings[name]);
  }

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("readings",{
    users: users,
    tarots: tarots,
    readings: readingsArray
  });
});
*/

//new routing
//users
app.get('/user/:userName', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let readings = JSON.parse(fs.readFileSync('data/readings.json'));
  let tarotArray = JSON.parse(fs.readFileSync('data/tarotCards.json'));

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

  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});

//index
app.get('/login', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login");
});

//astrology
app.get('/astrologyEntry', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("astrologyEntry");
});

app.get('/astrologyInfo', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("astrologyInfo");
});

//connect
app.get('/connect', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("connect");
});

//tarot
app.get('/drawCard', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("drawCard");
});

app.get('/cardDrawn', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("cardDrawn");
});

//visualize
app.get('/visualize', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("visualize");
});

app.get('/postVisualization', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("postVisualization");
});

//manifestations
app.get('/loadManifestations', function(request, response){
  let name = request.query.manifestName;
  let manifest = request.query.manifest;
  if(name && manifest!=""){

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("loadManifestations",{
        name: name,
        manifest: manifest
  });
  }
  else {
    response.status(400);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"400"
    });
  }
});

app.get('/manifest', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("manifest");
});

// Because routes/middleware are applied in order,
// this will act as a default error route in case of
// a request fot an invalid route
app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404"
  });
});

//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
