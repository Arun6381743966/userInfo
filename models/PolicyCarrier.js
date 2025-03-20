// const mongoose = require("mongoose");
// const PolicyCarrierSchema = new mongoose.Schema({
//   company_name: String,
// });
// module.exports = mongoose.model("PolicyCarrier", PolicyCarrierSchema);
const mongoose = require("mongoose");

const CarrierSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PolicyCarrier", CarrierSchema);
