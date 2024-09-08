const jwt = require('jsonwebtoken');
const productService = require('../services/productService');
const dotenv = require('dotenv');
const loaderService = require("../services/loaderService");

dotenv.config();  // To load the secret from .env

const productController = {

    // Get products by user licenses
    getProducts: (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

        if (!token) {
            return res.status(401).json({ message: 'JWT token is missing' });
        }

        // Verify the token and extract user data
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            // user contains the payload (e.g., userId)
            const userId = user.id;

            productService.getProducts(userId, (err, products) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }
                res.json({ products });
            });
        });
    }

};

module.exports = productController;
