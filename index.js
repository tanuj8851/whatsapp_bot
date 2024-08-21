// index.js

const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { sendReminder } = require("./src/utils/reminderService");

const {
  handleIncomingMessage,
} = require("./src/controllers/webhookController");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Path to the Excel file
const dataFilePath = path.join(__dirname, "./data", "water_usage_data.xlsx");

// Ensure the Excel file exists, otherwise create it
if (!fs.existsSync(dataFilePath)) {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet([["Date", "Value"]]);
  xlsx.utils.book_append_sheet(wb, ws, "Data");
  xlsx.writeFile(wb, dataFilePath);
}

//homepage endpoint
app.get("/", (req, res) => {
  res.send("homepage");
});

// Endpoint to handle incoming WhatsApp messages
app.post("/webhook", handleIncomingMessage);

//Send Messages after every 5 minutes.
setInterval(() => {
  sendReminder();
}, 300000);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
