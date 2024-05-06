const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./db/connect");
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// Connect to MongoDB
connectDB();
module.exports = app;
