const authService = require('../services/authService');

const authController = {
    register: (req, res) => {
        const { username, email, password } = req.body;
        authService.register(username, email, password, (token) => {
            res.json({ message: 'User registered', token });
        });
    },

    login: (req, res) => {
        const { username, password, hwid } = req.body;
        authService.login(username, password, hwid, (err, token) => {
            if (err) return res.status(400).json({ message: err });
            res.json({ message: 'User logged in', token });
        });
    },
};

module.exports = authController;
