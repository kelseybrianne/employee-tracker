const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'empoyee_db'
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Succesfully connected to mysql');
    }
})

module.exports = connection;