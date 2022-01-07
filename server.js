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
    let players = JSON.parse(fs.readFileSync('data/users.json'));
    let playerArray = [];
    let tarotCards = JSON.parse(fs.readFileSync('data/tarotCards.json'));

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("tarot", {
      users: players,
      tarotCards: tarotCards
    });
});

app.get('/readings', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let userArray = [];

  //create an array to use sort, and dynamically generate win percent
  for(name in users){
    users[name].win_percent = (users[name].win/parseFloat(users[name].win+users[name].lose+users[name].tie) * 100).toFixed(2);
    if(users[name].win_percent=="NaN") users[name].win_percent=0;
    userArray.push(users[name])
  }
  userArray.sort(function(a, b){
    return parseFloat(b.win_percent)-parseFloat(a.win_percent);
  })

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("readings",{
    users: userArray
  });
});

app.get('/user/:userName', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));

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
      user: users[userName]
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
