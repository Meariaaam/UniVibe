const express = require("express"); //By Merjam Farj Al-Beibani
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});
const upload = multer({ storage: storage });

// POST /api/register
router.post("/register", upload.single("file"), async (req, res) => {
  const { fullname, surname, email, phone, password } = req.body;
  console.log(req.body); 
  console.log(req.file); 

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." }); 
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullname,
      surname,
      email,
      phone,
      password: hashedPassword,
      mecenatImage: req.file.path,  // Path to the uploaded file
      isVerified: false,  // Default to false, will change it manually later for verification
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;

//login 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password'); 

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Your account is not verified yet' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, fullname: user.fullname },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
