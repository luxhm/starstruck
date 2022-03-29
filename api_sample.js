let axios = require('axios'); //install with npm install axios


var userId = '619075';
var apiKey = '76390c8427e33ee348caf4f42b2b4e81';

doit();
async function doit(){

try {
  await axios.post('https://json.astrologyapi.com/v1/western_horoscope', {
    day: 10,
    month: 5,
    year: 1990,
    hour: 19,
    min: 55,
    lat: 19.2056,
    lon: 25.2056,
    tzone: -5
  }, {
    headers: {
      "authorization": "Basic" + Buffer.from("619075:76390c8427e33ee348caf4f42b2b4e81").toString("base64"),
      "Content-Type": 'application/json'
    }
  }).then(function(resp) {
    console.log(resp.data);
    console.log("done");
    return resp.data;
  });

} catch (err) {
  console.error(err);
} //the try catch is necessary

}

/*
var request = $.ajax({
  url: "https://json.astrologyapi.com/v1/" + api,
  method: "POST",
  dataType: 'json',
  headers: {
    "authorization": "Basic " + btoa(userId + ":" + apiKey),
    "Content-Type": 'application/json'
  },
  data: JSON.stringify(data)
});
// Returns A promiss
return (request.then(function(resp) {
  return resp;
}, function(err) {
  return err;
}));
}
*/
