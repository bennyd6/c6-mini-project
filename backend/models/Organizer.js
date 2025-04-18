const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  organizationName: String,
  contactNumber: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organizer', organizerSchema);
