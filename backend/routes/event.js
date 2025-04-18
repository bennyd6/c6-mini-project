const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const fetchOrganizer = require('../middleware/fetchorganizer');

const router = express.Router();

// Route 1: Create an event (POST /api/event/create)
router.post('/create', fetchOrganizer, [
  body('title', 'Title is required').notEmpty(),
  body('date', 'Valid date is required').isISO8601(),
  body('totalTickets', 'Total tickets must be a number').isInt({ min: 1 }),
  body('availableTickets', 'Available tickets must be a number').isInt({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, date, location, totalTickets, availableTickets } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      totalTickets,
      availableTickets,
      organizerId: req.organizer.id
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
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// Route 3: Get all events (GET /api/event/)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).populate('organizerId', 'name organizationName');
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
