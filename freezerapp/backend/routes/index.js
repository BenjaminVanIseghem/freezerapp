var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Freezer = mongoose.model('Freezer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ok!");
});

router.get('/API/freezer/', function(req, res, next){
  Freezer.find(function(err, freezers) {
    if (err) { return next(err); }
    res.json(freezers);
  });
});

module.exports = router;
