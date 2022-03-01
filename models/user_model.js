const fs = require('fs');

exports.getUsers = function(){
  let users = JSON.parse(fs.readFileSync(__dirname+'../data/users.json'));
  return users;
}
