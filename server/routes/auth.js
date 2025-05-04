const express = require("express");
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

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullname,
      surname,
      email,
      phone,
      password: hashedPassword,
      mecenatImage: req.file ? req.file.path : null,
      isVerified: false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
