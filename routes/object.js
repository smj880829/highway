var express = require('express');
var router = express.Router();
var mysql = require('../mysqlConnector/connector.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('object/index', { title: 'Express' });
});




module.exports = router;
