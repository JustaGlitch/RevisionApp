// Imports
const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");

// Routers
const studentRouter = require("./routes/studentRoutes");
const adminRouter = require("./routes/adminRoutes");
const classRouter = require("./routes/classRoutes");
const tasksRouter = require("./routes/tasksRoutes");
const studySessionRouter = require("./routes/studySessionRoutes");
const studentsRouter = require("./routes/studentsRoutes");

// Middleware
const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

//Routes

app.get("/", (req, res) => {
    res.send("this is the StudyDex API");
  });

app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/class", classRouter);
app.use("/tasks", tasksRouter);
app.use("/studySession", studySessionRouter);
app.use("/students", studentsRouter);

module.exports = app;
