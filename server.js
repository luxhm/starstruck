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
  let opponentName = request.body.opponentName;
  let opponentPhoto = request.body.opponentPhoto;
  if(opponentName&&opponentPhoto){
    let opponents = JSON.parse(fs.readFileSync('data/users.json'));
    let newOpponent={
      "name": opponentName,
      "photo": opponentPhoto,
      "win":0,
      "lose": 0,
      "tie": 0,
    }
    opponents[opponentName] = newOpponent;
    fs.writeFileSync('data/users.json', JSON.stringify(opponents));

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
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("tarot");

    let players = JSON.parse(fs.readFileSync('data/users.json'));
    fs.writeFileSync('data/users.json', JSON.stringify(players));

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("tarot", {
      data: results
    });
});

app.get('/readings', function(request, response) {
  let opponents = JSON.parse(fs.readFileSync('data/users.json'));
  let opponentArray=[];

  //create an array to use sort, and dynamically generate win percent
  for(name in opponents){
    opponents[name].win_percent = (opponents[name].win/parseFloat(opponents[name].win+opponents[name].lose+opponents[name].tie) * 100).toFixed(2);
    if(opponents[name].win_percent=="NaN") opponents[name].win_percent=0;
    opponentArray.push(opponents[name])
  }
  opponentArray.sort(function(a, b){
    return parseFloat(b.win_percent)-parseFloat(a.win_percent);
  })

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("readings",{
    opponents: opponentArray
  });
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
