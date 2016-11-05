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
  if(req.param('etc') == null){
    mysql.list("select * from servicing_object",function(re){
      res.render('servicing/list', { list: re});
    })
  }
  else{
    mysql.list("select * from servicing_object where etc='"+req.param('etc')+"'",function(re){
      res.render('servicing/list', { list: re});
    })
  }
});

router.get('/list_object', function(req, res, next) {
  mysql.list("select * from servicing_object where object_id="+req.param('object_id'),function(re){
    res.render('servicing/list', { list: re});
  })
});




module.exports = router;
