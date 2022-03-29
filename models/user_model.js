const fs = require('fs');
let axios = require('axios'); //install with npm install axios

var sdkClient = require('../models/APIResources/sdk');

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

//API Async router
exports.getAstrology = async function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  //console.log(users[userID].birthdate);
  let bdayArray = users[userID].birthdate.split("-");
  let day = bdayArray[2];
  let month = bdayArray[1];
  let year = bdayArray[0];

  var data = {
      'date': day,
      'month': month,
      'year': year,
      'hour': 1,
      'minute': 25,
      'latitude': 25,
      'longitude': 82,
      'timezone': 5.5
  };
  // api name which is to be called
  var resource = "astro_details";

  // call horoscope apis
  await sdkClient.call(resource, data.date, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone, function(error, result){
      console.log(resource, data.date, data.month, data.year, data.hour, data.minute, data.latitude, data.longitude, data.timezone);
      console.log("SDKCLIENT: "+  sdkClient);
      if(error)
      {
          console.log(error);
          console.log("Error returned!!");
      }
      else
      {
          console.log('Response has arrived from API server --');
          console.log(result);
      }
  });
/*
  try {
       const resp = await axios.post('https://json.astrologyapi.com/v1/western_horoscope',{
         day: day,
         month: month,
         year: year,
         hour: 4,
         min: 30,
         lat: 40.7128,
         lon: -74.0060,
         tzone: -5
       }, {
         headers: {
           "authorization": "Basic" + Buffer.from("619075:76390c8427e33ee348caf4f42b2b4e81").toString("base64"), "Content-Type":'application/json'
         }
       }).then(function(resp){
         console.log(resp.data);
         console.log("done");
         return resp.data;
       });

   } catch (err) {
       console.error(err);
   }//the try catch is necessary
   */
}
