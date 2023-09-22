const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Creates an Express application
const app = express();

// Middlewares
app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors())
  .use(cookieParser());

// Routes
app.use("/api", require("./routes/auth"));

// Error handling
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).send(err);
  
});

// Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = { app, server };