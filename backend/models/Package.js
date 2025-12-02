const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  duration: { type: String },
  price: { type: Number, required: true },
  destinations: [{ type: String }],
  category: { type: String },
  includes: [{ type: String }],
  highlights: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
