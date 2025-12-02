const express = require("express");
const router = express.Router();
const CarRental = require("../models/CarRental");

// CREATE
router.post("/", async (req, res) => {
  try {
    const rental = new CarRental(req.body);
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const rentals = await CarRental.find();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE
router.get("/:id", async (req, res) => {
  try {
    const rental = await CarRental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Not found" });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const rental = await CarRental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await CarRental.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
