require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Route imports
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const activityRoutes = require('./routes/activities'); //New line
const contactRoutes = require('./routes/contact'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true, //this is not needed since its old version and not used in new mongodb node driver
  // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activities', activityRoutes); // New route for activities
app.use('/api/contact', contactRoutes);


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
