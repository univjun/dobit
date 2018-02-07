var mysql = require('mysql');

var options = {
    host: 'localhost',
    user: 'root',
    password: '923601',
    database: 'node_express_first_db'
};


var dbConn = mysql.createConnection(options);

module.exports = dbConn;