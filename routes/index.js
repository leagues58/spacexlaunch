var express = require('express');
var router = express.Router();




var data = {
  lauches: [
    'launch1',
    'launch2',
    'launch3',
    'launch4',
    'launch5',
    'launch6',
    'launch7'
  ]





}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'spacexlaunch.org', data});
});

module.exports = router;
