const mongoose = require('mongoose');

const carRentalSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['SUV', 'Sedan', 'Van', 'Jeep', 'Luxury'],
  },
  description: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  features: [{
    type: String,
  }],
  image: {
    type: String,
    default: '',
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CarRental', carRentalSchema);

