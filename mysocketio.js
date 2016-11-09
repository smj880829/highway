var io =  require('socket.io')();
var mysql = require('./mysqlConnector/connector.js');
var ip = "52.78.102.96"

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

  socket.on('insert_service', function(data){
    console.log(data);

    mysql.insert('insert INTO servicing(object_id,etc,date_start,date_end,state,contract,price,money) values ('+data.values+')',function(re){
        console.log(re);
    })
  });

  socket.on('insert_object', function(data){
    console.log(data);
    mysql.insert('insert INTO object(kind,name,dist,number) values ('+data.values+')',function(re){
        console.log(re);
    })
  });

  socket.on('select_customer_object', function(data){
    console.log(data);

  });

  socket.on('select_object_list', function(){
    mysql.list('select * from object_customer where kind < 100',function(re){
        socket.emit('object_list', re);
    })
  });

  socket.on('select_object_list2', function(){
    mysql.list('select * from object_customer where kind < 100',function(re){
        socket.emit('object_list2', re);
    })
  });

  socket.on('link_customer_object', function(data){
    mysql.insert("insert INTO customer_model(customer_id,object_id) values ("+data.values+")",function(re){
        console.log(re);
    })
  });

  socket.on('list_customer_object', function(data){
    mysql.list('select * from object_customer where customer_id=' + data.customer_id,function(re){
        socket.emit('list_object_customer', re);
    })
  });

  socket.on('insert_myitem', function(data){
    console.log(data);
    mysql.insert('insert INTO myitem(kind,name,price_marked,price_selling,price_purchasing,count,number) values ('+data.values+')',function(re){
        console.log(re);
    })
  });

  socket.on('test', function(){
    console.log('test');
  });




})
