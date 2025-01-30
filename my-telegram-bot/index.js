const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Replace with your bot token
const token = '7852353009:AAHa2iDEcvxdZo-6J2iQwmJ6puWnzwDliLw';
const bot = new TelegramBot(token);

// Replace with your Vercel URL (update after deploying the project)
const webhookUrl = 'https://your-vercel-url.vercel.app';

// Middleware for parsing JSON
app.use(express.json());

// Set webhook
bot.setWebHook(`${webhookUrl}/bot${token}`);

// Handle incoming updates via webhook
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Send /help to see available commands.');
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show help');
});

// Handle location sharing
bot.on('location', (msg) => {
  const chatId = msg.chat.id;
  const location = msg.location;
  bot.sendMessage(chatId, `Received location: Latitude ${location.latitude}, Longitude ${location.longitude}`);
});

// Handle photo sharing
bot.on('photo', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received a photo!');
});

// Handle video sharing
bot.on('video', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received a video!');
});

// Base route for testing
app.get('/', (req, res) => {
  res.send('Telegram bot is running!');
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
