// Imports
const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");

// Routers

// Middleware
const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

//Routes

app.get("/", (req, res) => {
    res.send("this is the StudyDex API");
  });

module.exports = app;
