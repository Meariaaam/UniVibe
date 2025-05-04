const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/pending', async (req, res) => {
    const users = await User.find({ isVerified: false });
    res.json(users);
});

router.put('/verify/id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {isVerified: true }, { new: true });
    res.json(user);
});
module.exports = router