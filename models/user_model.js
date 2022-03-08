const fs = require('fs');
let axios = require('axios'); //install with npm install axios

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

//API Async router
exports.getAstrology = async function(userID){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  console.log(users[userID].birthdate);
  let bdayArray = users[userID].birthdate.split("-");
  let day = bdayArray[2];
  let month = bdayArray[1];
  let year = bdayArray[0];
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
           "authorization": "Basic" + btoa("619075:76390c8427e33ee348caf4f42b2b4e81"), "Content-Type":'application/json'
         }
       }).then(function(response){
         console.log(response.data);
         console.log("done");
         return response.data;
       });
   } catch (err) {
       console.error(err);
   }//the try catch is necessary
}
