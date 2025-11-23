const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  destinations: [{
    type: String,
  }],
  image: {
    type: String,
    default: '',
  },
  includes: [{
    type: String,
  }],
  highlights: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['Adventure', 'Family', 'Luxury', 'Budget', 'Photography'],
    default: 'Adventure',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Package', packageSchema);

