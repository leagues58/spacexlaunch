/*****************************************************************************
about.js
Page to display some about info.  Also eventually a feeback form, and maybe
a bit about how the site was made.
******************************************************************************/


var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('about', {title: 'about' });
  });
  
  
  
  // export the route object
  module.exports = router;