const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert'); 


router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find({ type: "anomaly" }).select('year temperature createdAt -_id');
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Server error fetching alerts" });
  }
});

module.exports = router;
