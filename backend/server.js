const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const connectDB = require('./config/db'); // This is only here, not in routes

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// ✅ Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/tours', upload.single('image'), require('./routes/tours'));
app.use('/api/rentals', upload.single('image'), require('./routes/rentals'));
app.use('/api/packages', upload.single('image'), require('./routes/packages'));
app.use('/api/gallery', upload.single('image'), require('./routes/gallerys')); // Gallery route
app.use('/api/contact', require('./routes/contact'));

console.log('Server started - All routes loaded (including /api/gallery)'); // Debug

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Yala Safari Crew API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});