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

  app.post('/', function (req, res) {
    res.render('jade_test', {temps: 'Express123123'})
    //res.sendFile(__dirname + '/Route_Page.html',{ temps: 'Express123123'});
    //console.log(req.body.flgs);
  })

  app.get('/message/:id', function(req, res){
    var id = req.params.id
    var str = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex')
    res.send(str)
  })

  app.get('/search', function(req, res){
    var query = req.query
    res.send(query)
  })

  app.get('/books', function(req, res){
    fs.readFile(__dirname +'/books.json', function(e, data) {
        if (e) return res.sendStatus(500)
        try {
          books = JSON.parse(data)
        } catch (e) {
          res.sendStatus(500)
        }
        res.json(books)
      })
  })

  app.listen(3000, function () {
    console.log('EX server start');
  });

}

exports.start = start;
