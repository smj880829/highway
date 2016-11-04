var io =  require('socket.io')();
var mysql = require('./mysqlConnector/connector.js');

module.exports = function(options) {
  io.attach(options,{origins:'localhost' +':* http://' + 'localhost' +':*'});
  //io.attach(options);
};

io.on('connection', function (socket) {
    console.log('socket connect');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('insert_customer', function(data){
    console.log(data);
    mysql.insert('insert INTO customer(name,age,tel,sex,address,email) values ('+data.values+')',function(re){
        console.log(re);
    })
  });

  socket.on('test', function(){
    console.log('test');
  });




})
