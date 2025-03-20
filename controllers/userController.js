const User = require("../models/User");
const Policy = require("../models/Policy");

exports.searchUserPolicies = async (req, res) => {
  console.log("the data fsffsgsg", req.params.name);
  try {
    const user = await User.findOne({ firstName: req.params.name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const policies = await Policy.find({ userId: user.email });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// exports.aggregateUserPolicies = async (req, res) => {
//   try {
//     const aggregatedPolicies = await Policy.aggregate([{ $group: { _id: "$policy_number", totalPolicies: { $sum: 1 } } }]);
//     res.json(aggregatedPolicies);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

exports.getUserLit = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "Users retrieved successfully", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.aggregateUserPolicies = async (req, res) => {
  try {
    const aggregateData = await Policy.aggregate([
      { $group: { _id: "$userEmail", totalPolicies: { $sum: 1 } } },
      { $sort: { totalPolicies: -1 } }, // Optional: sort by policy count descending
    ]);

    res.json({ message: "Aggregated policy count by user", data: aggregateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
