const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const fetchUser = require('../middleware/fetchuser');

const router = express.Router();

// Route 1: Book a ticket for an event (POST /api/ticket/book/:eventId)
router.post('/book/:eventId', fetchUser, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.availableTickets <= 0) {
      return res.status(400).json({ error: 'No tickets available' });
    }

    const ticket = new Ticket({
      eventId: event._id,
      userId: req.user.id,
      ticketNumber: `TICKET-${uuidv4()}`
    });

    await ticket.save();

    // Decrease available tickets
    event.availableTickets -= 1;
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route 2: Get all tickets for logged-in user (GET /api/ticket/mytickets)
router.get('/mytickets', fetchUser, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).populate('eventId', 'title date location');
    res.json(tickets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route 3 (Optional): Cancel a ticket (PUT /api/ticket/cancel/:ticketId)
router.put('/cancel/:ticketId', fetchUser, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.ticketId, userId: req.user.id });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.status !== 'active') {
      return res.status(400).json({ error: 'Ticket is already cancelled or used' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    // Optionally increment available tickets in the event
    await Event.findByIdAndUpdate(ticket.eventId, { $inc: { availableTickets: 1 } });

    res.json({ msg: 'Ticket cancelled successfully', ticket });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
