const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  maxParticipants: { type: Number, required: true }, // "Max passenger"
  includes: { type: [String], default: [] }, // Optional "Include"
});

module.exports = mongoose.model("Tour", TourSchema);