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

let cardArray = [];

//.............Define server routes..............................//
//Express checks routes in the order in which they are defined

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

  if(userName&&userBday&&userSun&&userMoon&&userRising){
    let users = JSON.parse(fs.readFileSync('data/users.json'));
    let newUser ={
      "name": userName,
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

app.get('/tarot', function(request, response) {
    let users = JSON.parse(fs.readFileSync('data/users.json'));
    let tarotCards = JSON.parse(fs.readFileSync('data/tarotCards.json'));
    let tarotArray = [];

    for(i in tarotCards){
      tarotArray.push(i);
    }

    let randomNum = Math.floor(Math.random()*11)+1;
    let randomCard = tarotArray[randomNum];
    console.log(tarotArray[randomNum]);

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
  let card = request.body.card;

  cardArray.push(card);

  if(name&&card){
    let readings = JSON.parse(fs.readFileSync('data/readings.json'));
    let newReading = {
      "name": name,
      "card": cardArray
    }
    readings[name] = newReading;

    fs.writeFileSync('data/readings.json', JSON.stringify(readings));

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect("readings");
  }
});


app.get('/readings', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let readings = JSON.parse(fs.readFileSync('data/readings.json'));

  let readingsArray = [];
  for(name in readings){
    readingsArray.push(readings[name]);
  }

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("readings",{
    users: users,
    readings: readingsArray
  });
});

app.get('/user/:userName', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let readings = JSON.parse(fs.readFileSync('data/readings.json'));

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
      readings: readings[userName].card
    });

  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
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
