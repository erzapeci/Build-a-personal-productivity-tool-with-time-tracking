const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Task DB Connected'))
  .catch(err => console.error(err));

app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Task service running on port ${PORT}`));
