
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
let fileName  = "launchdata/" + date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + '.txt'



/* GET home page. */
router.get('/', function(req, res, next) {
  fs.stat(fileName, function(err, stat) {
    if(err == null) {
        console.log('file exists');
    } else if(err.code == 'ENOENT') {
        // file does not exist, so get the data a write to file
        request('http://api.spacexdata.com/v2/launches/upcoming', { json: true }, (err, response, body) => {

        fs.writeFile( fileName, JSON.stringify(body), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
      });

    } else {
        console.log('Some other error: ', err.code);
    }
});
  
res.render('index', { title: '', datastuff: 'launchData'});
});



// export the route object
module.exports = router;








router.get('/', function(req, res, next) {
    
  });
