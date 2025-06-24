const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['incomplete', 'complete'],
    default: 'incomplete'
  },
  userEmail: String
});

module.exports = mongoose.model('Task', taskSchema);
