const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const SelfWhatsappNumber = process.env.WHATSAPP_NUMBER;

module.exports = {
  client,
  whatsappNumber,
  SelfWhatsappNumber,
};
