const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  includes: { type: [String], default: [] },
  highlights: { type: [String], default: [] },
  bestTime: { type: String, required: true },
});

module.exports = mongoose.model('Tour', TourSchema);
