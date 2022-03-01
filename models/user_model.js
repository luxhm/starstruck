const fs = require('fs');

exports.getUser = function(){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  return users;
}

exports.createUser =  function (userID, userName){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(!users[userID]){
    let newUser={
      "Name": userName,
      "birthdate": [],
      "birthplace": [],
      "birthtime": [],
    }
    users[userID] = newUser;
    fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
  }
}

exports.saveAstrology = function(userID, userName, birthdate, birthplace, birthtime){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(users[userID]){
    let userUpdate={
      "Name": userName,
      "birthdate": birthdate,
      "birthplace": birthplace,
      "birthtime": birthtime,
    }
    users[userID] = userUpdate;
    fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
  }

  console.log("astrology saved");
}
