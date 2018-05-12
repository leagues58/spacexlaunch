var express     = require('express');
var router      = express.Router();
var launchModel = require('../models/launch_schema.js');
//var bodyParser  = require('body-parser');


var data = {};






// GET listener
router.get('/', function(req, res, next) {
  if(req.query.pass == 'eric') {

    // find all the launch data
    launchModel.find().select().exec().then(returneddata => {data = returneddata;});

    res.render('controller', { title: 'spacexlaunch.org', datastuff: data});
  } else {
    res.redirect('/');
  }
});


// POST listener
router.post('/', function(req, res){
  console.log(req.body);

  var formData = {
    name: req.body.launch_name,
    rocket_type: req.body.rocket_type,
      has_launched: false,
      launch_successful: false,
      location: {
          city: req.body.location_city,
          state: req.body.location_state,
          country: 'USA',
          name: req.body.location_name
      },
      notes: req.body.notes
  }

  var newLaunch = new launchModel(formData);

// Save the new model instance, passing a callback
newLaunch.save(function (err) {
  if (err) console.log(err);
  // saved!
  data = {
    title: 'Add Launch',
    message: 'Launch successfully added!'
  }
  res.render('addLaunch', data);
});


});

module.exports = router;
