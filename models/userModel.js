const db = require('../config/Database');

const User = {
    findByUsername: (username, callback) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.query(sql, [username], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        });
    },

    create: (username, email, password, callback) => {
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.query(sql, [username, email, password], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    updateHwid: (userId, hwid, callback) => {
        const sql = `UPDATE users SET hwid = ? WHERE id = ?`;
        db.query(sql, [hwid, userId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },
};

module.exports = User;