const db = require('../config/Database');

const Product = {
    // Find product by ID
    findById: (productId, callback) => {
        const sql = `SELECT * FROM products WHERE product_id = ?`;
        db.query(sql, [productId], (err, result) => {
            if (err) throw err;
            callback(result[0]);  // Return the first result (or undefined if not found)
        });
    },

    // Find product by name
    findByName: (productName, callback) => {
        const sql = `SELECT * FROM products WHERE product_name = ?`;
        db.query(sql, [productName], (err, result) => {
            if (err) throw err;
            callback(result[0]);  // Return the first result (or undefined if not found)
        });
    },

    // todo: create, update, delete
};

module.exports = Product;
