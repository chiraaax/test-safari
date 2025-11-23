const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/tours', require('./routes/tours'));
app.use('/api/rentals', require('./routes/rentals'));
app.use('/api/packages', require('./routes/packages'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Muthugala Tours API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

