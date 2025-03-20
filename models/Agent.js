// const mongoose = require("mongoose");
// const AgentSchema = new mongoose.Schema({
//   agent: String,
// });
// module.exports = mongoose.model("Agent", AgentSchema);
const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema(
  {
    agentName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", AgentSchema);
