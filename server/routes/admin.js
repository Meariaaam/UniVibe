const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

// Get users pending verification
router.get('/pending', async (req, res) => {
  try {
    const users = await User.find(); // Or filter by pending only
    res.json(users);
  } catch (err) {
    console.error('GET /pending error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle user verification
router.put('/verify/:id', async (req, res) => {
    const { id } = req.params;
    const { isVerified } = req.body;
  
    console.log('Received verification update:', req.body); // ✅ ADD THIS
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isVerified },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: `User ${isVerified ? 'verified' : 'unverified'}` });
    } catch (err) {
      console.error('PUT /verify/:id error:', err);
      res.status(500).json({ message: 'Server error verifying user' });
    }
  });
  

module.exports = router;
