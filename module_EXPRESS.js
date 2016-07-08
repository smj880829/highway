var express = require('express')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser');

function start(){
  app.set('view engine', 'jade');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));


  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/HelloWorld.html');
    //console.log(req.route);
  })

  app.get('/route', function (req, res) {
    res.sendFile(__dirname + '/Route_Page.html');
    //console.log(req.route);
  })

  app.get('/base', function (req, res) {
    res.sendFile(__dirname + '/Route_Page.html');
    //console.log(req.route);
  })

  app.listen(3000, function () {
    console.log('EX server start');
  });

}

exports.start = start;
