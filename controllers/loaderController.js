const jwt = require('jsonwebtoken');
const loaderService = require('../services/loaderService');
const dotenv = require('dotenv');

dotenv.config();  // To load the secret from .env

const loaderController = {
    // Assign license key to user
    assignKey: (req, res) => {
        const { license_key } = req.body;
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

            loaderService.assignKey(license_key, userId, (err, message) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }
                res.json({ message });
            });
        });
    },

    getUsermode: (req, res) => {
        res.json({ message: 'Success' });

    },
    getKernelmode: (req, res) => {
        res.json({ message: 'Success' });
    }

};

module.exports = loaderController;
