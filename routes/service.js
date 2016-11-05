var express = require('express');
var router = express.Router();
var mysql = require('../mysqlConnector/connector.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('service/index', { title: 'Express' });
});


router.get('/insert', function(req, res, next) {
  res.render('servicing/insert', { title: 'Express' });
});




module.exports = router;
