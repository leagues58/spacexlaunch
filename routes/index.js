
/*****************************************************************************
index.js
loads the express module, uses it to get a router object.  Then specify a route
on that object and export it.  This export is used in app.js.
The route has a callback which is invoked whenever a GET request happens.
******************************************************************************/


var express       = require('express');
var router        = express.Router();
var fs            = require('fs');
var request       = require('request');

let date      = new Date();
let fileName  = "launchdata/" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + '.txt'

var objLaunches;

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

   // find out if this hour's data already exists
   fs.stat(fileName, function(err, stat) {

   // if so, load the file contents
   if(err == null) {

      fs.readFile(fileName, 'utf8', function (err, data) {
         if (err) throw err;
         console.log('reading file');
         objLaunches = JSON.parse(data);
       });      

   // if there is no file, hit the API and write contents to file
   } else if(err.code == 'ENOENT') {
      console.log('hitting endpoint');
      // file does not exist, so get the data a write to file
      request('http://api.spacexdata.com/v2/launches/upcoming', { json: true }, (err, response, body) => {
         console.log('writing file with new data');
         fs.writeFile( fileName, JSON.stringify(body), function(err) {

            if(err) {
               console.log('error writing new data to file');
               console.log(err);
            }
            objLaunches = body;
            console.log("The file was saved!");
         }); 

      });

   } 

   res.render('index', { title: '', launches: objLaunches});

   });
});



// export the route object
module.exports = router;
