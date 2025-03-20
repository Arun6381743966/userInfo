// const mongoose = require("mongoose");
// const PolicySchema = new mongoose.Schema({
//   policy_number: String,
//   policy_start_date: Date,
//   policy_end_date: Date,
//   categoryId: mongoose.Schema.Types.ObjectId,
//   companyId: mongoose.Schema.Types.ObjectId,
//   userId: mongoose.Schema.Types.ObjectId,
// });
// module.exports = mongoose.model("Policy", PolicySchema);

// const mongoose = require("mongoose");

// const PolicySchema = new mongoose.Schema(
//   {
//     policyNumber: { type: String, required: true, unique: true },
//     policyStartDate: { type: String },
//     policyEndDate: { type: String },
//     categoryName: { type: String },
//     companyName: { type: String },
//     premiumAmountWritten: { type: String },
//     premiumAmount: { type: String },
//     policyType: { type: String },
//     hasActivePolicy: { type: Boolean },
//     userId: { type: String, required: true, unique: true },
//     userEmail: { type: String, unique: true, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Policy", PolicySchema);

// const mongoose = require("mongoose");

// const PolicySchema = new mongoose.Schema(
//   {
//     policyNumber: { type: String, required: true, unique: true },
//     policyStartDate: { type: String },
//     policyEndDate: { type: String },
//     premiumAmountWritten: { type: String },
//     premiumAmount: { type: String },
//     policyType: { type: String },
//     hasActivePolicy: { type: Boolean },
//     userId: { type: String, required: true, unique: true }, // No unique constraint
//     userEmail: { type: String, required: true, unique: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Policy", PolicySchema);

const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema(
  {
    policyNumber: { type: String, required: true, unique: true }, // Using policyNumber as unique key
    policyStartDate: { type: String },
    policyEndDate: { type: String },
    premiumAmountWritten: { type: String },
    premiumAmount: { type: String },
    policyType: { type: String },
    hasActivePolicy: { type: Boolean },
    // Remove unique constraint on userEmail so duplicate emails are allowed
    userEmail: { type: String },
    userId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", PolicySchema);
