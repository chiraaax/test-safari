const express = require('express');
const router = express.Router();
const CarRental = require('../models/CarRental');

// Get all car rentals
router.get('/', async (req, res) => {
  try {
    const rentals = await CarRental.find();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single car rental
router.get('/:id', async (req, res) => {
  try {
    const rental = await CarRental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Car rental not found' });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create car rental
router.post('/', async (req, res) => {
  try {
    const rental = new CarRental(req.body);
    const savedRental = await rental.save();
    res.status(201).json(savedRental);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update car rental
router.put('/:id', async (req, res) => {
  try {
    const rental = await CarRental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rental) {
      return res.status(404).json({ message: 'Car rental not found' });
    }
    res.json(rental);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete car rental
router.delete('/:id', async (req, res) => {
  try {
    const rental = await CarRental.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Car rental not found' });
    }
    res.json({ message: 'Car rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

