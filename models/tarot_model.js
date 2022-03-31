const fs = require('fs');

exports.getCards = function(){
  let cards = JSON.parse(fs.readFileSync(__dirname+'/../data/tarotCards.json'));
  return cards;
}

exports.drawSaveCard = function(request){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let tarotCards = JSON.parse(fs.readFileSync(__dirname+'/../data/tarotCards.json'));
  let readings = JSON.parse(fs.readFileSync(__dirname+'/../data/readings.json'));

  let tarotArray = [];
  for(i in tarotCards){
    tarotArray.push(i);
  }

  let randomNum = Math.floor(Math.random()*11)+1;
  randomCard = tarotArray[randomNum];
  let userEmail = request.user._json.email;

  if (userEmail){
    if (userEmail in readings) {
      readings[userEmail].card.push(randomCard);
      fs.writeFileSync('data/readings.json', JSON.stringify(readings));
    }
    else {
      let newReading = {
        "name": userEmail,
        "card": [randomCard],
      }
      readings[userEmail] = newReading;
      fs.writeFileSync('data/readings.json', JSON.stringify(readings));
    }
  }
return randomCard


}
