var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ok!");
});

router.get('/API/freezer', function(req, res, next){
  res.send("freezer");
});

module.exports = router;
