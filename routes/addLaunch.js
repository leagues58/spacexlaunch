var express     = require('express');
var router      = express.Router();
var launchModel = require('../models/launch_schema.js');
//var bodyParser  = require('body-parser');


var data = {
  title: 'spacexlaunch.org'
}






// GET listener
router.get('/', function(req, res, next) {
  res.render('addLaunch', data);
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
