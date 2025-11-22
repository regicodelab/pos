const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ email: username, password });        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if(user.role == 'waiter'){
            return res.status(403).json({ message: 'Access denied for waiters' });
        }

        const token = jwt.sign({ id: user._id, first_name: user.first_name, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
