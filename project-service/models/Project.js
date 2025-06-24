const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  userEmail: { type: String, required: true },
  createdAt: { type: Date },
  completedAt: { type: Date },  // Shto fushën e përfundimit
});

module.exports = mongoose.model('Project', projectSchema);
