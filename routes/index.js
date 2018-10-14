
/*****************************************************************************
index.js
loads the express module, uses it to get a router object.  Then specify a route
on that object and export it.  This export is used in app.js.
The route has a callback which is invoked whenever a GET request happens.
******************************************************************************/


let express       = require('express');
let router        = express.Router();
let fileSystem    = require('fs');
let request       = require('request');

let launchDataLastSavedDate      = new Date();
let launchDataFile  = "launchdata/" + launchDataLastSavedDate.getFullYear() + launchDataLastSavedDate.getMonth() + launchDataLastSavedDate.getDate() + launchDataLastSavedDate.getHours() + '.txt'

let launchData;

/* API endpoints
all launches, past and future
http://api.spacexdata.com/v2/launches/all

future launches
http://api.spacexdata.com/v2/launches/upcoming

past launches
http://api.spacexdata.com/v2/launches

*/



/* GET home page. */
router.get('/', function(req, res, next) {

  if (fileSystem.existsSync(launchDataFile)) {
    fileSystem.readFile(launchDataFile, 'utf8', function (err, data) {
      if (err) throw err;
      launchData = JSON.parse(data);
    });    
  } else {
    request('http://api.spacexdata.com/v2/launches/upcoming', { json: true }, (err, response, body) => {
        fileSystem.writeFile( launchDataFile, JSON.stringify(body), function(err) {
          if(err) {
            console.log(err);
          }
          launchData = body;
        }); 
    });
  } 
   res.render('index', { title: '', launches: launchData});
});



// export the route object
module.exports = router;
