var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_blanform',
    password        : 'apple',
    database        : 'cs340_blanform'
})

connection.query('SELECT discipline_id AS Discipline ID FROM Disciplines');

module.exports.pool = pool;