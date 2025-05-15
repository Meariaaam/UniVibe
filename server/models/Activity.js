const mongoose = require('mongoose'); //By Merjam Farj Al-Beibani

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
    bookedUsers: [
    {
      firstName: String,
      lastName: String,
      userId: mongoose.Schema.Types.ObjectId, // Reference to User model if exists
    },
  ],
});

module.exports = mongoose.model('Activity', activitySchema);
