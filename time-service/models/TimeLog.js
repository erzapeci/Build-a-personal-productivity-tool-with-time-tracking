// models/TimeLog.js
const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  taskTitle: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(endTime) {
        return endTime > this.startTime;
      },
      message: 'End time must be after start time'
    }
  },
});

module.exports = mongoose.model('TimeLog', timeLogSchema);