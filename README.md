# WhatsApp Bot for Water Usage Data Collection

This project is a Node.js-based WhatsApp bot that collects daily water usage data from users and stores it in an Excel spreadsheet. The bot sends periodic reminders to users to submit their water usage, and the data is stored with the date in the spreadsheet.

## Features

- **Periodic Reminders:** Sends reminders every 5 minutes to the user to submit their water usage data.
- **Data Storage:** Collects water usage data and stores it in an Excel spreadsheet with two columns: `Date` and `Value`.
- **Twilio Integration:** Uses Twilio API to handle WhatsApp messaging.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- A Twilio account with a WhatsApp sandbox setup.
- Ngrok (or a similar tool) for local development with webhooks.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/tanuj8851/whatsapp_bot.git
    cd whatsapp_bot
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Twilio credentials:

    ```plaintext
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  # Your Twilio WhatsApp sandbox number
    PORT=3000  # Or any other port you prefer
    ```

4. **Run the server:**

    ```bash
    node index.js
    ```

5. **Set up Ngrok:**

    Run Ngrok to expose your local server to the internet:

    ```bash
    ngrok http 3000
    ```

   Copy the forwarding URL provided by Ngrok and update your Twilio WhatsApp sandbox webhook URL with this URL followed by `/webhook`.

## Usage

- After running the bot, it will send a WhatsApp message to your test number every 5 minutes, asking for the daily water usage data.
- Reply with the amount of water used in the format: `100 liters`.
- The bot will store the data in an Excel file located in the `./data/water_usage_data.xlsx` file.

## Project Structure

```plaintext
whatsapp_bot_water_usage/
├── data/
│   └── water_usage_data.xlsx     # Excel file for storing water usage data
├── .env                          # Environment variables
├── index.js                      # Main server file
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Lock file for dependencies
└── README.md                     # Project documentation
|__ src/
|   └── config
|       └── twilioConfig.js       # Twilio Config and env import data
|   └── controller
|       └── webhookController.js  # WebHook Controller
|   └── utils
|       └── remainerService.js    # 5 min timer
```


##License

This project is licensed under the MIT License.
This `README.md` file provides a clear overview of the project, setup instructions, usage guide, and other essential details. You can modify it according to your project specifics.



   
