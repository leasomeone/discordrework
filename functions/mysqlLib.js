const mysql = require('mysql');
const config = require('../config.js');

module.exports = { connect }

function connect() {
    var con = mysql.createConnection({
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPass,
        port: '/var/run/mysqld/mysqld.sock'
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
}

