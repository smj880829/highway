var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'highway1',
    password: 'root'
});

function insert(sql,callback){
  pool.getConnection(function (err, connection) {
      connection.query(sql, function (err, rows) {
          if (err) {
            console.error("err : " + err);
            callback(false)
          }
          callback(true)
          connection.release();
      });
  });
}

function list(sql,callback){
  pool.getConnection(function (err, connection) {
      connection.query(sql, function (err, rows) {
          if (err) {
            console.error("err : " + err);
            callback(false)
          }
          callback(rows)
          connection.release();
      });
  });
}

function select(sql,callback){
  pool.getConnection(function (err, connection) {
      connection.query(sql, function (err, rows) {
          if (err) {
            console.error("err : " + err);
            callback(false)
          }
          callback(rows)
          connection.release();
      });
  });
}

exports.insert = insert;
exports.list = list;
exports.select = select;
