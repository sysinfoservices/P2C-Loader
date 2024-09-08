const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const authService = {
    register: async (username, email, password, callback) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create(username, email, hashedPassword, (result) => {
            callback(null, { message: 'User successfully registered' });
        });
    },

    login: async (username, password, hwid, callback) => {
        User.findByUsername(username, async (user) => {
            if (!user) {
                return callback('User not found');
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return callback('Invalid password');
            }

            // HWID logic
            if (!user.hwid) {
                User.updateHwid(user.id, hwid, () => {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return callback(null, token);
                });
            } else if (user.hwid !== hwid) {
                return callback('HWID does not match');
            } else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return callback(null, token);
            }
        });
    },
};

module.exports = authService;

