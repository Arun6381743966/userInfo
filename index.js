const express = require("express");
const mongoose = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cpuMonitor = require("./services/cpuMonitor");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api", require("./routes/api"));
app.use("/api", require("./routes/schedulingRoutes"));

app.use("/api/messages", require("./routes/messageRoutes"));

cpuMonitor();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
