
/*****************************************************************************
index.js
loads the express module, uses it to get a router object.  Then specify a route
on that object and export it.  This export is used in app.js.
The route has a callback which is invoked whenever a GET request happens.
******************************************************************************/
/* API endpoints
all launches, past and future
http://api.spacexdata.com/v2/launches/all

future launches
http://api.spacexdata.com/v2/launches/upcoming

past launches
http://api.spacexdata.com/v2/launches

*/


let express       = require('express');
let router        = express.Router();
let fileSystem    = require('fs');
let request       = require('request');

let launchDataLastSavedDate      = new Date();
let launchDataFile  = "launchdata/" + launchDataLastSavedDate.getFullYear() + launchDataLastSavedDate.getMonth() + launchDataLastSavedDate.getDate() + launchDataLastSavedDate.getHours() + '.txt'

let launchData;


/* GET home page. */
router.get('/', function(req, res, next) {

  if (fileSystem.existsSync(launchDataFile)) {
    readLaunchDataFromFile(launchDataFile).then(launchData => renderPage(res, launchData));
  } else {
    getLaunchDataFromAPI(launchDataFile).then(launchData => renderPage(res, launchData));
  } 
  
});


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
    request('http://api.spacexdata.com/v2/launches/upcoming', { json: true }, (err, response, body) => {
      if (err) reject(err);
      else {
        resolve(body);
        fileSystem.writeFile( dataFile, JSON.stringify(body), (err) => {}); 
      }
    });
  });
}

function renderPage(res, launchData) {
  res.render('index', { title: '', launches: launchData});
}



// export the route object
module.exports = router;
