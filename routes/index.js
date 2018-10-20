
/*****************************************************************************
index.js
Page retreives the launch data json from either a file on disk 
(if the file) is less than 1 hour old, or hits the API endpoint to obtain a 
fresh copy of the data, which it then writes to disk for next time. In either
flow, the launch data is then passed to the index view.
******************************************************************************/
/* API endpoints
all launches, past and future
http://api.spacexdata.com/v2/launches/all

future launches
http://api.spacexdata.com/v2/launches/upcoming

past launches
http://api.spacexdata.com/v2/launches

*/

let express = require('express');
let router = express.Router();
let fileSystem = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  
  let launchDataFilePath = getLaunchDataFilePath();

  if (fileSystem.existsSync(launchDataFilePath)) {
    readLaunchDataFromFile(launchDataFilePath).then(launchData => renderPage(res, launchData));
  } else {
    getLaunchDataFromAPI(launchDataFilePath).then(launchData => renderPage(res, launchData));
  } 
  
});


function getLaunchDataFilePath() {
  let currentDateTime = new Date();
  return `launchdata/${currentDateTime.getFullYear()}${currentDateTime.getMonth()}${currentDateTime.getDate()}${currentDateTime.getHours()}.txt`;
}

function readLaunchDataFromFile(dataFile) {
  return new Promise((resolve, reject) => {
    fileSystem.readFile(dataFile, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function getLaunchDataFromAPI(dataFile) {
  return new Promise((resolve, reject) => {
    let request = require('request');
    request('http://api.spacexdata.com/v2/launches/upcoming', { json: true }, (err, response, body) => {
      if (err) reject(err);
      else {
        resolve(body);
        fileSystem.writeFile( dataFile, JSON.stringify(body)); 
      }
    });
  });
}

function renderPage(res, launchData) {
  res.render('index', { title: '', launches: launchData});
}



// export the route object
module.exports = router;
