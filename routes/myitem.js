var express = require('express');
var router = express.Router();
var mysql = require('../mysqlConnector/connector.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myitem/index', { title: 'Express' });
});

router.get('/insert', function(req, res, next) {
  res.render('myitem/insert', { title: 'Express' });
});


router.get('/list', function(req, res, next) {
  mysql.list("select * from myitem",function(re){
    res.render('myitem/list', { list: re});
  })
});

module.exports = router;
