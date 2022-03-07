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
exports.getAstrology = async function(api){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let day = users.birthDay.
  try {
       const resp = await axios.post('https://json.astrologyapi.com/v1/western_horoscope',{
         day: users.birthDay,
         month: ,
         year: ,
         hour: ,
         min: ,
         lat: ,
         lon: ,
         tzone: -5
       }).then(function(response){
         return response.data;
       });
   } catch (err) {
       console.error(err);
   }//the try catch is necessary
}
