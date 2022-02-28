const fs = require('fs');

exports.getCards = function(){
  let cards = JSON.parse(fs.readFileSync(__dirname'data/tarotCards.json'));
  return cards;
}
