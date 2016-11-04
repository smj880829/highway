var express = require('express');
var router = express.Router();
var mysql = require('../mysqlConnector/con.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer/index', { title: 'Express' });
});

router.get('/insert', function(req, res, next) {
  res.render('customer/insert', { title: 'Express' });
});

router.get('/select', function(req, res, next) {
  mysql.select("select * from customer where idcustomer="+req.param('customer_id'),function(re){
    console.log(re[0]);
    res.render('customer/select', re[0]);
  })

});

router.get('/list', function(req, res, next) {
  mysql.list("select * from customer",function(re){
    res.render('customer/list', { list: re});
  })
});

module.exports = router;
