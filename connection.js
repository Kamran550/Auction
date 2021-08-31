const mysql = require('mysql')

var connection = mysql.createConnection({
    user: 'root',
    password: 'bootcamp2021',
    host: 'localhost',
    port: 3306,
    database: 'greatBay_DB'
})

module.exports = connection