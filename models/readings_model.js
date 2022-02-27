const fs = require('fs');

exports.getReadings = function(){
  let readings = JSON.parse(fs.readFileSync(__dirname'data/readings.json'));
  return readings;
}
