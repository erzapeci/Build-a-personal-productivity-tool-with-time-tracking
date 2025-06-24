// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const logRoutes = require('./routes/timelogs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/timelogs', logRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
