// const mongoose = require("mongoose");
// var model_user = require("./model");

// const mongoURI = "mongodb+srv://arunkumarkannan1999:jJVVDy1yjlqS1Jz3@cluster0.mkyzu.mongodb.net/learning?retryWrites=true&w=majority";
// // const mongoURI = "mongodb+srv://arunkumarkannan1999:jJVVDy1yjlqS1Jz3@cluster0.mkyzu.mongodb.net/learning?retryWrites=true&w=majority&appName=Cluster0";

// // Connect to MongoDB
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB 🚀");
//     aashik();
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Function to fetch data correctly
// async function aashik() {
//   try {
//     const data = await model_user.find(); // Await the query
//     console.log("Fetched Data:", data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // Run the function after 2 seconds
// // setTimeout(() => {
// //   aashik();
// // }, 5000);
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
// ✅ Register API routes
app.use("/api", require("./routes/api"));
app.use("/api", require("./routes/schedulingRoutes"));
// Register routes
app.use("/api/messages", require("./routes/messageRoutes"));

cpuMonitor();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
