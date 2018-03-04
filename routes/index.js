
/*****************************************************************************
index.js
loads the express module, uses it to get a router object.  Then specify a route
on that object and export it.  This export is used in app.js.
The route has a callback which is invoked whenever a GET request happens.
******************************************************************************/


var express = require('express');
var router = express.Router();
var launchModel = require('../public/javascripts/launch_schema.js');






// connect to database
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/spacexlaunch';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//define data being passed to db
var data = {
  name: 'Rocket Launch1',
  rocket_type: 'Falcon 9',
    has_launched: false,
    launch_successful: false,
    location: {
        city: 'Cape Caniveral',
        state: 'Florida',
        country: 'USA',
        name: 'Kennedy Space Center'
    },
    notes: 'First launch recorded in our database!'
}


//use the model to enter some data
/*var launch1 = new launchModel(data);

// Save the new model instance, passing a callback
launch1.save(function (err) {
  if (err) console.log(err);
  // saved!
});

*/


// find all athletes who play tennis, selecting the 'name' and 'age' fields
launchModel.find().select().exec().then(returneddata => {data = returneddata});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'spacexlaunch.org', datastuff: data});
});



// export the route object
module.exports = router;
