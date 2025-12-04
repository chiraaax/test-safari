const mongoose = require("mongoose");

const carRentalSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  seats: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  available: { type: Boolean, default: true },
  fuel: { type: String, required: true },
});

module.exports = mongoose.model("CarRental", carRentalSchema);