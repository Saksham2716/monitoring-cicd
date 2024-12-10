const express = require("express");
const promClient = require("prom-client");

const app = express();
const port = 8082;

// Create a default registry for Prometheus metrics
const register = promClient.register;

// Example metric: Counter to track button clicks
const buttonClickCounter = new promClient.Counter({
  name: "button_clicks_total",
  help: "Total number of button clicks",
});

// Simulate incrementing the counter (you can trigger this via an API or event)
setInterval(() => {
  buttonClickCounter.inc();
}, 5000);

// Expose /metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
