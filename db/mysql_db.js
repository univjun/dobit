var mysql = require('mysql');

var options = {
    host: 'localhost',
    user: 'root',
    password: '1099as',
    database: 'univjundb'
};


var dbConn = mysql.createConnection(options);

module.exports = dbConn;