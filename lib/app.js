const express = require("express");
const morgan = require("morgan");

const app = express();

// Set up request logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
} else if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (request, response) => {
  response.send("Hello world");
});

module.exports = app;
