// routes/timelogs.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/timeLogController');

router.post('/', controller.createLog);
router.get('/', controller.getLogs);
router.delete('/:id', controller.deleteLog);
router.put('/:id', controller.updateLog); // Shto rrugën e re për update

module.exports = router;