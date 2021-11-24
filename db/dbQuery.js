const mysql = require('mysql');
const databasename = "lab3";

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",
    port: "3306",
    user: "lab3",
    password: "NIEjjVZ9WCAjUtf7",
    database: "lab3",
    debug: true
});

function executeQuery(query, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        } else if (connection) {
            connection.query(query, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        } else {
            return callback(true, "No Connection");
        }
    });
}

function getResult(query, callback) {
    executeQuery(query, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            callback(true, err);
        }
    });
}

module.exports = {
    getResult
};