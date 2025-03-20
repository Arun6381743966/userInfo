// const mongoose = require("mongoose");
// const PolicyCategorySchema = new mongoose.Schema({
//   category_name: String,
// });
// module.exports = mongoose.model("PolicyCategory", PolicyCategorySchema);
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PolicyCategory", CategorySchema);
