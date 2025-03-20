const os = require("os");
const { exec } = require("child_process");

module.exports = function monitorCPU() {
  setInterval(() => {
    const cpuLoad = os.loadavg()[0];
    // console.log("the data", cpuLoad);
    if (cpuLoad > 0.7) {
      console.log("High CPU usage detected. Restarting server...");

      // exec("pm2 restart all");
    }
  }, 5000);
};
