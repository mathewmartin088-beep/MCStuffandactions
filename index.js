const express = require('express');
const mineflayer = require('mineflayer');

// --- 1. Web Server (Keep-Alive Endpoint) ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot is active!');
});

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

// --- 2. Minecraft AFK Bot ---
const MC_HOST = 'jamsmp.mcsh.gg'; // e.g. "myserver.aternos.me"
const MC_PORT = 25565;            // Default port or host assigned port

function createBot() {
  console.log('Connecting bot to Minecraft server...');
  
  const bot = mineflayer.createBot({
    host: MC_HOST,
    port: MC_PORT,
    username: 'KeepAliveBot'
  });

  bot.on('spawn', () => {
    console.log('Bot successfully joined the server!');
  });

  bot.on('error', (err) => {
    console.error('Bot encountered error:', err.message);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });
}

createBot();
