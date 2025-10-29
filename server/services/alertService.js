const axios = require("axios");
const cron = require("node-cron");
const mongoose = require("mongoose");
const Alert = require("../models/Alert");

mongoose.connect("mongodb://localhost:27017/earthscape", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

cron.schedule("*/1 * * * *", async () => {
  try {
    const res = await axios.get("http://localhost:8000/alerts");
    const alerts = res.data;

    if (Array.isArray(alerts) && alerts.length > 0) {
      for (const item of alerts) {
        if (item.year === 2025) {
          const existing = await Alert.findOne({
            year: item.year,
            temperature: item.temperature,
            type: "anomaly"
          });

          if (!existing) {
            await Alert.create({
              year: item.year,
              temperature: item.temperature,
              type: "anomaly"
            });

            console.log(`✅ New 2025 alert saved for year ${item.year}`);
          }
        }
      }
    } else {
      console.log("✅ No new alerts from R API.");
    }
  } catch (error) {
    console.error("❌ Error fetching alerts:", error.message);
  }
});

