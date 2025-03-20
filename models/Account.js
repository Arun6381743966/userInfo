// const mongoose = require("mongoose");
// const AccountSchema = new mongoose.Schema({
//   accountName: String,
// });
// module.exports = mongoose.model("Account", AccountSchema);
const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true, unique: true },
    accountType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", AccountSchema);
