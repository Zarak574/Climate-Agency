// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  year: Number,
  temperature: Number,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Alert", alertSchema);
