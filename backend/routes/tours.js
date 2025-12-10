const express = require("express");
const router = express.Router();
const Tour = require("../models/Tour");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // For file deletion

console.log("Tours route loaded"); // Debug log

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
    console.log("POST /tours - Body:", req.body, "File:", req.file ? req.file.filename : "No file"); // Debug
    const { title, description, duration, price, maxParticipants, includes } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : ""; // Get uploaded file path

    if (!imagePath) {
      return res.status(400).json({ message: "Image is required!" });
    }

    // Validate numbers
    const validatedPrice = validateNumber(price, "Price");
    const validatedMaxParticipants = validateNumber(maxParticipants, "Max Participants");

    const tourData = {
      title,
      image: imagePath,
      description,
      duration,
      price: validatedPrice,
      maxParticipants: validatedMaxParticipants,
      includes: includes ? includes.split(",").map((i) => i.trim()).filter(Boolean) : [], // Filter empty
    };

    const tour = new Tour(tourData);
    await tour.save();
    console.log("Tour created:", tour._id); // Debug
    res.status(201).json(tour);
  } catch (error) {
    console.error("POST error:", error); // Debug
    res.status(400).json({ message: error.message }); // 400 for validation
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    console.log("GET /tours"); // Debug
    const tours = await Tour.find();
    console.log(`Found ${tours.length} tours`); // Debug
    res.json(tours);
  } catch (error) {
    console.error("GET error:", error); // Debug
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE (with optional file upload)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("PUT /tours/:id - Body:", req.body, "File:", req.file ? req.file.filename : "No file"); // Debug
    let tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Not found" });

    const { title, description, duration, price, maxParticipants, includes } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : tour.image; // Keep old if no new

    // Validate numbers if provided
    const validatedPrice = price !== undefined ? validateNumber(price, "Price") : tour.price;
    const validatedMaxParticipants = maxParticipants !== undefined ? validateNumber(maxParticipants, "Max Participants") : tour.maxParticipants;

    const updateData = {
      title: title || tour.title,
      image: imagePath,
      description: description || tour.description,
      duration: duration || tour.duration,
      price: validatedPrice,
      maxParticipants: validatedMaxParticipants,
      includes: includes ? includes.split(",").map((i) => i.trim()).filter(Boolean) : tour.includes,
    };

    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    console.log("Tour updated:", updatedTour._id); // Debug
    res.json(updatedTour);
  } catch (error) {
    console.error("PUT error:", error); // Debug
    res.status(400).json({ message: error.message }); // 400 for validation
  }
});

// DELETE (with file deletion)
router.delete("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Not found" });

    // Delete the image file from uploads folder
    if (tour.image) {
      const filePath = path.join(__dirname, '..', tour.image); // Full path: backend/uploads/filename.jpg
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Deleted image file:", filePath); // Debug
      } else {
        console.log("Image file not found:", filePath); // Debug
      }
    }

    // Delete the DB entry
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully, including image" });
  } catch (error) {
    console.error("DELETE error:", error); // Debug
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;