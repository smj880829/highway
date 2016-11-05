var express = require('express');
var router = express.Router();
var mysql = require('../mysqlConnector/connector.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('servicing/index', { title: 'Express' });
});


router.get('/insert', function(req, res, next) {
  res.render('servicing/insert', { title: 'Express' });
});

router.get('/select', function(req, res, next) {
  mysql.select("select * from servicing_object where idservicing="+req.param('servicing_id'),function(re){

    res.render('servicing/select', re[0]);
  })
});

router.get('/list', function(req, res, next) {
  mysql.list("select * from servicing_object",function(re){
    res.render('servicing/list', { list: re});
  })
});




module.exports = router;
