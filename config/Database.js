const mysql = require('mysql2');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Loader',
});

database.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

module.exports = database;
