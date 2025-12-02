const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// ✅ Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/rentals', require('./routes/rentals'));
app.use('/api/packages', require('./routes/packages'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Muthugala Tours API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
