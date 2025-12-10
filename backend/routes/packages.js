const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new package (handles FormData with image file)
router.post('/', async (req, res) => {
  try {
    const { name, description, duration, price, destinations, category, includes, highlights } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store relative path

    const pkg = new Package({
      name,
      image,
      description,
      duration,
      price: Number(price),
      destinations: destinations ? destinations.split(',').map(d => d.trim()) : [],
      category,
      includes: includes ? includes.split(',').map(i => i.trim()) : [],
      highlights: highlights ? highlights.split(',').map(h => h.trim()) : [],
    });

    const newPkg = await pkg.save();
    res.status(201).json(newPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a package (handles FormData with optional new image)
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.body.duration && { duration: req.body.duration }),
      ...(req.body.price && { price: Number(req.body.price) }),
      ...(req.body.destinations && { destinations: req.body.destinations.split(',').map(d => d.trim()) }),
      ...(req.body.category && { category: req.body.category }),
      ...(req.body.includes && { includes: req.body.includes.split(',').map(i => i.trim()) }),
      ...(req.body.highlights && { highlights: req.body.highlights.split(',').map(h => h.trim()) }),
    };

    // Handle image update if new file uploaded
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedPkg = await Package.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedPkg) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a package
router.delete('/:id', async (req, res) => {
  try {
    const deletedPkg = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPkg) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;