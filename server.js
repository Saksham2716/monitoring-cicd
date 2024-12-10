const express = require('express');
const promClient = require('prom-client');
const path = require('path');

const app = express();
const port = 8081;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Create a registry to collect metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register }); // Collect default Node.js metrics

// Example of a custom metric
const clickCounter = new promClient.Counter({
  name: 'button_clicks_total',
  help: 'Total number of button clicks',
});
register.registerMetric(clickCounter);

// Route for metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Simulate tracking button clicks
app.post('/button-click', (req, res) => {
  clickCounter.inc(); // Increment counter
  res.send({ status: 'OK' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
