const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Creates an Express application
const app = express();

// Middlewares
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Parse application/json
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).send("Internal server error");
});

// Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

module.exports = { app, server };
