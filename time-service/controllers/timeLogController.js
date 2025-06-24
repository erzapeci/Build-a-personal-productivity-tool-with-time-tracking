// controllers/timeLogController.js
const TimeLog = require('../models/TimeLog');

exports.createLog = async (req, res) => {
  try {
    const log = await TimeLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLogs = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const logs = await TimeLog.find({ userEmail });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLog = async (req, res) => {
  const { id } = req.params;
  try {
    await TimeLog.findByIdAndDelete(id);
    res.json({ message: 'Time log deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Funksioni i ri për update
exports.updateLog = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLog = await TimeLog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLog) {
      return res.status(404).json({ error: 'Time log not found' });
    }
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};