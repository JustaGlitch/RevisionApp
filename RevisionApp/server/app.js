// Imports
const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");

// Routers

// Middleware
const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

//Routes

module.exports = api;
