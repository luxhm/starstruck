const fs = require('fs');

exports.getCards = function(){
  let cards = JSON.parse(fs.readFileSync('/Users/luxhoganmurphy/Documents/GitHub/starstruck/data/tarotCards.json'));
  //__dirname+'../data/tarotCards.json'
  return cards;
}
