const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Project DB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

// Routes
app.use('/api/projects', require('./routes/projects'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Project Service running on port ${PORT}`));