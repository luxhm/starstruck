const fs = require('fs');

exports.getReadings = function(){
  let readings = JSON.parse(fs.readFileSync('/Users/luxhoganmurphy/Documents/GitHub/starstruck/data/readings.json'));
  return readings;
}
