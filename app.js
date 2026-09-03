const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route - simple live page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Node.js Docker App</title></head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 80px;">
        <h1>🚀 Node.js App Running in Docker</h1>
        <p>Hostname (container ID): <b>${os.hostname()}</b></p>
        <p>Server time: ${new Date().toLocaleString()}</p>
        <p>Try <a href="/api/status">/api/status</a> or <a href="/health">/health</a></p>
      </body>
    </html>
  `);
});

// Health check endpoint - useful for Docker/monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Simple JSON API endpoint
app.get('/api/status', (req, res) => {
  res.json({
    app: 'nodejs-docker-app',
    status: 'running',
    hostname: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
