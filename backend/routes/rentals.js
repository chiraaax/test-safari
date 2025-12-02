const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");

// CREATE
router.post("/", async (req, res) => {
  try {
    const rental = new Rental(req.body);
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE
router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Not found" });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Rental.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
