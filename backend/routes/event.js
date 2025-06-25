const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const fetchOrganizer = require('../middleware/fetchorganizer');

const router = express.Router();




const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter });



// Route 1: Create an event (POST /api/event/create)
router.post('/create', fetchOrganizer, upload.single('image'), [
  body('title', 'Title is required').notEmpty(),
  body('date', 'Valid date is required').isISO8601(),
  body('totalTickets', 'Total tickets must be a number').isInt({ min: 1 }),
  body('availableTickets', 'Available tickets must be a number').isInt({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, date, location, totalTickets, availableTickets } = req.body;

    // Image path from upload
    const imagePath = req.file ? req.file.path : null;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      totalTickets,
      availableTickets,
      organizerId: req.organizer.id,
      image: imagePath
    });

    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route 2: Get all events created by logged-in organizer (GET /api/event/myevents)
router.get('/myevents', fetchOrganizer, async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.organizer.id }).sort({ date: 1 });

    const enrichedEvents = events.map(event => ({
      ...event._doc,
      imageUrl: event.image ? `http://localhost:3000/${event.image.replace(/\\/g, "/")}` : null
    }));

    res.json(enrichedEvents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



// Route 3: Get all events (GET /api/event/)
router.get('/', async (req, res) => {
  try {
    const currentDate = new Date();
    const events = await Event.find({ date: { $gte: currentDate } })
      .sort({ date: 1 })
      .populate('organizerId', 'name organizationName');

    const enrichedEvents = events.map(event => ({
      ...event._doc,
      imageUrl: event.image ? `http://localhost:3000/${event.image.replace(/\\/g, "/")}` : null
    }));

    res.json(enrichedEvents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
