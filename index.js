const express = require('express');
const mineflayer = require('mineflayer');

// --- 1. HTTP Server for Koyeb Uptime ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('KeepAliveBot is active!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// --- 2. Bot Configuration ---
const MC_HOST = 'jamsmp.mcsh.gg'; // Replace with your server IP / domain
const MC_PORT = 25565;            // Replace with your server port
const BOT_NAME = 'KeepAliveBot';  // Desired username for the bot

function createBot() {
  console.log('Connecting bot to server...');

  const bot = mineflayer.createBot({
    host: MC_HOST,
    port: MC_PORT,
    username: BOT_NAME,
    physicsEnabled: false // Disables physics to prevent "Invalid move player packet" kicks
  });

  bot.on('spawn', () => {
    console.log(`${BOT_NAME} successfully spawned into the server and is now sitting AFK!`);
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked:', reason);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });
}

createBot();
