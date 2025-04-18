const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticketNumber: { type: String, required: true, unique: true },
  issuedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'cancelled', 'used'], default: 'active' }
});

module.exports = mongoose.model('Ticket', ticketSchema);