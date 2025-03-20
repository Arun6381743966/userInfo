// // const mongoose = require("mongoose");
// // const UserSchema = new mongoose.Schema({
// //   firstName: String,
// //   dob: Date,
// //   address: String,
// //   phone: String,
// //   state: String,
// //   zipCode: String,
// //   email: String,
// //   gender: String,
// //   userType: String,
// // });
// // module.exports = mongoose.model("users", UserSchema);
// var mongoose = require("mongoose");

// var schema = mongoose.Schema;

// var schema_user = new schema(
//   {
//     firstname: String,
//     dob: Date,
//     address: String,
//     phone: String,
//     state: String,
//     zipCode: String,
//     email: String,
//     gender: String,
//     userType: String,
//   },
//   { collection: "users", timestamps: true, versionKey: false }
// );

// var model_user = mongoose.model("users", schema_user);

// module.exports = model_user;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    dob: { type: String },
    address: { type: String },
    phone: { type: String },
    state: { type: String },
    zipCode: { type: String },
    email: { type: String, unique: true, required: true },
    gender: { type: String },
    userType: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
