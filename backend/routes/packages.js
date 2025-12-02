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

// CREATE a new package
router.post('/', async (req, res) => {
  const pkg = new Package(req.body);
  try {
    const newPkg = await pkg.save();
    res.status(201).json(newPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a package
router.put('/:id', async (req, res) => {
  try {
    const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
