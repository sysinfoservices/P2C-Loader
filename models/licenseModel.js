const db = require('../config/Database');

const License = {
    // Find license by license key
    findByLicenseKey: (licenseKey, callback) => {
        const sql = `SELECT * FROM licenses WHERE license_key = ?`;
        db.query(sql, [licenseKey], (err, result) => {
            if (err) throw err;

            const license = result[0];

            if (!license) {
                // License not found
                return callback('License key not found');
            }

            // Otherwise, return the license for further processing
            callback(null, license);
        });
    },


    // Find licenses by user ID
    findByUserId: (userId, callback) => {
        const sql = `SELECT * FROM licenses WHERE used_by = ?`;
        db.query(sql, [userId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    // Find a license by user ID and product ID
    findByUserAndProduct: (userId, productId, callback) => {
        const sql = `SELECT * FROM licenses WHERE used_by = ? AND product = ?`;
        db.query(sql, [userId, productId], (err, result) => {
            if (err) throw err;
            callback(result[0]);  // Return the first result
        });
    },

    // Update license duration
    updateDuration: (licenseId, newDuration, callback) => {
        const sql = `UPDATE licenses SET duration = ? WHERE id = ?`;
        db.query(sql, [newDuration, licenseId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    // Assign license to user (sets used_by and starts the license)
    assignLicenseToUser: (licenseId, userId, callback) => {
        const sql = `UPDATE licenses SET used_by = ? WHERE id = ?`;
        db.query(sql, [userId, licenseId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    // Start the license timer (sets the current server time in started_at)
    startTimer: (licenseId, callback) => {
        const startedAt = new Date();  // Current server time
        const sql = `UPDATE licenses SET started_at = ? WHERE id = ?`;
        db.query(sql, [startedAt, licenseId], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
};

module.exports = License;
