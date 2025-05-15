const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity'); // Adjust the path if needed

// POST - Create a new activity
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('POST /api/activities error:', error);
    res.status(400).json({ message: error.message });
  }
});

// GET - Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    console.error('GET /api/activities error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ PUT - Update an activity by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error('PUT /api/activities/:id error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ DELETE - Delete an activity by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/activities/:id error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET - Get booked users for a specific activity
router.get('/:id/bookings', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity.bookedUsers);
  } catch (error) {
    console.error('GET /api/activities/:id/bookings error:', error);
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
