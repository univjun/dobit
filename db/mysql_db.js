var mysql = require('mysql');

var options = {
    host: 'localhost',
    user: 'root',
    password: '1099as',
    database: 'univjundb'
};


var dbConn = mysql.createConnection(options);

module.exports = dbConn;

//hello2
//univjundb
//1099as
//
// password: '923601',
// database: 'node_express_first_db'

    // password: '1099as',
    // database: 'univjundb'