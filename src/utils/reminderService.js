const {
  client,
  whatsappNumber,
  SelfWhatsappNumber,
} = require("../config/twilioConfig");

exports.sendReminder = () => {
  client.messages
    .create({
      body: "Please send today's Water Usage Data.",
      from: `whatsapp:${whatsappNumber}`,
      to: `whatsapp:${SelfWhatsappNumber}`,
    })
    .then((message) => {
      console.log("Reminder sent:", message.sid);
    })
    .catch((error) => {
      console.error("Error sending reminder:", error);
    });
};
