const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.get('/pending', async (req, res) => {
    const users = await User.find({ isVerified: true });
    res.json(users);
});

router.put('/verify/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User verified' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error verifying user' });
    }
});

module.exports = router;
