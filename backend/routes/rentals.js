const express = require("express");
const router = express.Router();
const CarRental = require("../models/CarRental");
const multer = require("multer");
const path = require("path");

console.log("Rentals route loaded"); // Debug log

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename: timestamp.ext
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed!"), false);
    }
  },
});

// Helper function to validate numbers
const validateNumber = (value, fieldName) => {
  const num = Number(value);
  if (isNaN(num) || num < 0) {
    throw new Error(`${fieldName} must be a valid positive number`);
  }
  return num;
};

// CREATE (with file upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("POST /rentals - Body:", req.body, "File:", req.file ? req.file.filename : "No file"); // Debug
    const { vehicleName, vehicleType, description, seats, features, available, fuel } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : ""; // Get uploaded file path

    if (!imagePath) {
      return res.status(400).json({ message: "Image is required!" });
    }

    // Validate numbers
    const validatedSeats = validateNumber(seats, "Seats");

    const rentalData = {
      vehicleName,
      vehicleType,
      image: imagePath,
      description,
      seats: validatedSeats,
      features: features ? features.split(",").map((f) => f.trim()).filter(Boolean) : [], // Filter empty
      available: available === "true" || available === true,
      fuel,
    };

    const rental = new CarRental(rentalData);
    await rental.save();
    console.log("Rental created:", rental._id); // Debug
    res.status(201).json(rental);
  } catch (error) {
    console.error("POST error:", error); // Debug
    res.status(400).json({ message: error.message }); // 400 for validation
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    console.log("GET /rentals"); // Debug
    const rentals = await CarRental.find();
    console.log(`Found ${rentals.length} rentals`); // Debug
    res.json(rentals);
  } catch (error) {
    console.error("GET error:", error); // Debug
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

// UPDATE (with optional file upload)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("PUT /rentals/:id - Body:", req.body, "File:", req.file ? req.file.filename : "No file"); // Debug
    let rental = await CarRental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Not found" });

    const { vehicleName, vehicleType, description, seats, features, available, fuel } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : rental.image; // Keep old if no new

    // Validate numbers if provided
    const validatedSeats = seats !== undefined ? validateNumber(seats, "Seats") : rental.seats;

    const updateData = {
      vehicleName: vehicleName || rental.vehicleName,
      vehicleType: vehicleType || rental.vehicleType,
      image: imagePath,
      description: description || rental.description,
      seats: validatedSeats,
      features: features ? features.split(",").map((f) => f.trim()).filter(Boolean) : rental.features,
      available: available !== undefined ? (available === "true" || available === true) : rental.available,
      fuel: fuel || rental.fuel,
    };

    const updatedRental = await CarRental.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    console.log("Rental updated:", updatedRental._id); // Debug
    res.json(updatedRental);
  } catch (error) {
    console.error("PUT error:", error); // Debug
    res.status(400).json({ message: error.message }); // 400 for validation
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const rental = await CarRental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;