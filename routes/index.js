var express = require('express');
var authentication = require('../middlewares/authentication')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hiii");
});

module.exports = router;
