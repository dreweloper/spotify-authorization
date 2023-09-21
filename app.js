const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const auth = require("./routes/auth");

// Creates an Express application
const app = express();

// Middlewares
app
  .use(express.static(__dirname + "/public"))
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors())
  .use(cookieParser());

// Routes
app.use("/", auth);

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
