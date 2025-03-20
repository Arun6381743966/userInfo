var mongoose = require("mongoose");

var schema = mongoose.Schema;

var schema_user = new schema(
  {
    name: String,
    age: String,
  },
  { collection: "users", timestamps: true, versionKey: false }
);

var model_user = mongoose.model("users", schema_user);

module.exports = model_user;
