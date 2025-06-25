const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const fetchUser = require('../middleware/fetchuser');
const nodemailer = require("nodemailer");
const User = require('../models/User'); 

const router = express.Router();

// Route 1: Book a ticket for an event (POST /api/ticket/book/:eventId)
router.post('/book/:eventId', fetchUser, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.availableTickets <= 0) {
      return res.status(400).json({ error: 'No tickets available' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const ticket = new Ticket({
      eventId: event._id,
      userId: req.user.id,
      ticketNumber: `TICKET-${uuidv4()}`
    });

    await ticket.save();

    // Decrease available tickets
    event.availableTickets -= 1;
    await event.save();

    // ✉️ Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testbenny866@gmail.com',       // replace with your email
        pass: 'cfdd pgfc luat mebr'           // use app password (not your main password)
      }
    });

    const mailOptions = {
      from: '"Emisor Tickets" testbenny866@gmail.com',
      to: user.email,
      subject: `🎟️ Your Ticket for ${event.title}`,
      html: `
       <h2>Thank you for your booking, ${user.name}!</h2>
        <p>Here a re your ticket details:</p>
        <ul>
          <li><strong>Event:</strong> ${event.title}</li>
          <li><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</li>
          <li><strong>Location:</strong> ${event.location}</li>
          <li><strong>Ticket Number:</strong> ${ticket.ticketNumber}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <hr>
        <small>This is a demo ticket — no actual payment was processed.</small>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Email send error:', err);
        // Don't fail the response just for email failure
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route 2: Get all tickets for logged-in user (GET /api/ticket/mytickets)
router.get('/mytickets', fetchUser, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id })
      .populate('eventId', 'title date location image');

   const enrichedTickets = tickets.map(ticket => {
  const event = ticket.eventId;

  if (!event) {
    return { ...ticket._doc, eventId: null };
  }

  const imageUrl = event.image
    ? `http://localhost:3000/${event.image.replace(/\\/g, '/')}`
    : null;

  return {
    ...ticket._doc,
    eventId: {
      ...event._doc,
      imageUrl
    }
  };
});

    res.json(enrichedTickets);
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

// Route 4: Get all tickets for a particular event (GET /api/ticket/event/:eventId)
router.get('/event/:eventId', async (req, res) => {
  try {
    // Find tickets associated with the eventId
    const tickets = await Ticket.find({ eventId: req.params.eventId })
      .populate('userId', 'name email') // Optionally populate user details for the ticket
      .populate('eventId', 'title date location'); // Populate event details

    // If no tickets found
    if (tickets.length === 0) {
      return res.status(404).json({ error: 'No tickets found for this event' });
    }

    res.json(tickets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
