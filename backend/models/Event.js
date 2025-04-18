const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  totalTickets: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
