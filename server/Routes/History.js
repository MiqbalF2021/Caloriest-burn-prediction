const express = require('express');
const router = express.Router();
const historyController = require('../Controllers/historyControllers');
const History = require('../Models/History');

// Endpoint untuk menyimpan history kalori yang terbakar
router.post('/saveHistory', historyController.saveHistory);
router.get('/getHistory/:userId', historyController.getHistory);

module.exports = router;
