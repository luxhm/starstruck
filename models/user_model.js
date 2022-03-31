const fs = require('fs');
let axios = require('axios'); //install with npm install axios

//var sdkClient = require('../models/APIResources/sdk');

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

exports.saveAstrology = function(userID, userName, birthdate, sunSign, moonSign, risingSign){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  console.log(sunSign);
  if(users[userID]){
    let userUpdate={
      "name": userName,
      "birthdate": birthdate,
      "sunSign": sunSign,
      "moonSign": moonSign,
      "risingSign": risingSign
    }
    users[userID] = userUpdate;
    fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
  }
  console.log("astrology saved");
}

exports.getHoroscope = async function(sign){
  //try {
       const resp = await axios.post('https://aztro.sameerkumar.website/?sign='+sign+'&day=today');
       return resp.data;
   /*} catch (err) {
       console.error(err);
	     return {message:”Error loading data”};
   }*/
}
