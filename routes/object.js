var express = require('express');
var router = express.Router();
var mysql = require('../mysqlConnector/connector.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('object/index', { title: 'Express' });
});


router.get('/insert', function(req, res, next) {
  res.render('object/insert', { title: 'Express' });
});


router.get('/list', function(req, res, next) {
  mysql.list("select * from object",function(re){
    res.render('object/list', { list: re});
  })
});

router.get('/select', function(req, res, next) {
  mysql.select("select * from object where idobject="+req.param('object_id'),function(re){
    console.log(re[0]);

    res.render('object/select', re[0]);
  })
});



module.exports = router;
