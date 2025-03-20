const { Worker } = require("worker_threads");
const path = require("path");
require("dotenv").config();

exports.uploadFile = (req, res) => {
  const workerPath = path.join(__dirname, "../workers/fileProcessor.js"); // ✅ Corrects path issue

  const worker = new Worker(workerPath); // ✅ Uses absolute path

  worker.on("message", (message) => {
    res.json({ message });
  });

  worker.on("error", (error) => {
    res.status(500).json({ error: error.message });
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
};
