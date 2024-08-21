const xlsx = require("xlsx");
const path = require("path");

const { client, whatsappNumber } = require("../config/twilioConfig");

const dataFilePath = path.join(__dirname, "../../data/water_usage_data.xlsx");

exports.handleIncomingMessage = (req, res) => {
  const incomingMessage = req.body.Body;
  const from = req.body.From;
  const date = new Date().toLocaleDateString();

  if (incomingMessage.toLowerCase().includes("liters")) {
    const waterUsage = incomingMessage.match(/\d+/)[0];

    const wb = xlsx.readFile(dataFilePath);
    const ws = wb.Sheets["Data"];
    const newRow = { Date: date, Value: `${waterUsage} liters` };
    const newRowData = [newRow.Date, newRow.Value];
    const wsData = xlsx.utils.sheet_to_json(ws, { header: 1 });
    wsData.push(newRowData);
    const newWs = xlsx.utils.aoa_to_sheet(wsData);
    wb.Sheets["Data"] = newWs;
    xlsx.writeFile(wb, dataFilePath);

    client.messages
      .create({
        body: `Data received: ${waterUsage} liters on ${date}`,
        from: `whatsapp:${whatsappNumber}`,
        to: from,
      })
      .then((message) => {
        console.log("Message sent:", message.sid);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  } else {
    client.messages
      .create({
        body: `Please input the water usage in the format 'XXX liters'.`,
        from: `whatsapp:${whatsappNumber}`,
        to: from,
      })
      .then((message) => {
        console.log("Message sent:", message.sid);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }

  res.sendStatus(200);
};
