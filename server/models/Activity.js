const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  address: String,
  time: String,
  quantity: Number,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', activitySchema);
