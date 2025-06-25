const express = require('express');
const { body, validationResult } = require('express-validator');
const Organizer = require('../models/Organizer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchOrganizer = require('../middleware/fetchorganizer');

const JWT_SECRET = 'Bennyi$ag00dguy';
const router = express.Router();

// Route 1: Create Organizer
router.post('/createorganizer', [
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password, organizationName, contactNumber } = req.body;

    let existing = await Organizer.findOne({ email });
    if (existing) return res.status(400).json({ error: "Organizer already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const organizer = await Organizer.create({
      name,
      email,
      password: hashedPassword,
      organizationName,
      contactNumber
    });

    const payload = { organizer: { id: organizer.id } };
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route 2: Login Organizer
router.post('/login', [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  const { email, password } = req.body;

  try {
    const organizer = await Organizer.findOne({ email });
    if (!organizer) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const payload = { organizer: { id: organizer.id } };
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route 3: Get Organizer Details
router.get('/getorganizer', fetchOrganizer, async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.organizer.id).select('-password');
    res.send(organizer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;