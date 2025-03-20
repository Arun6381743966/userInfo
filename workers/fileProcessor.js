// // const { parentPort } = require("worker_threads");
// // const csvtojson = require("csvtojson");
// // const User = require("../models/User");
// // const path = require('path');
// // // const filePath = require("../csv/data-sheet.csv");
// // const filePath = process.env.FILE_PATH;

// // csvtojson()
// //   .fromFile(filePath)
// //   .then(async (jsonArray) => {
// //     await User.insertMany(jsonArray);
// //     parentPort.postMessage("File processed successfully");
// //   })
// //   .catch((err) => {
// //     parentPort.postMessage("Error processing file");
// //   });
// const { parentPort } = require("worker_threads");
// const csvtojson = require("csvtojson");
// const User = require("../models/User");
// const path = require("path");
// require("dotenv").config();

// const filePath = path.resolve(__dirname, process.env.FILE_PATH); // ✅ Ensures correct file path

// csvtojson()
//   .fromFile(filePath)
//   .then(async (jsonArray) => {
//     await User.insertMany(jsonArray);
//     parentPort.postMessage("File processed successfully");
//   })
//   .catch((err) => {
//     parentPort.postMessage("Error processing file: " + err.message);
//   });
// const { parentPort } = require("worker_threads");
// const csvtojson = require("csvtojson");
// const User = require("../models/User");
// const path = require("path");
// require("dotenv").config();

// const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// async function insertDataInChunks(data) {
//   const chunkSize = 500; // ⏳ Insert in batches of 500
//   for (let i = 0; i < data.length; i += chunkSize) {
//     await User.insertMany(data.slice(i, i + chunkSize)).catch((err) => console.error(err));
//   }
// }

// csvtojson()
//   .fromFile(filePath)
//   .then(async (jsonArray) => {
//     await insertDataInChunks(jsonArray);
//     parentPort.postMessage("✅ File processed successfully");
//   })
//   .catch((err) => {
//     parentPort.postMessage("❌ Error processing file: " + err.message);
//   });

// const { parentPort } = require("worker_threads");
// const csvtojson = require("csvtojson");
// const mongoose = require("mongoose");
// const User = require("../models/User");
// const path = require("path");
// require("dotenv").config();

// const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// // ✅ Function to connect to MongoDB
// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       console.log("✅ Already connected to MongoDB");
//       return;
//     }

//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // Wait 50 sec before timeout
//       socketTimeoutMS: 45000, // Adjust socket timeout
//       bufferCommands: false, // Disable command buffering
//     });

//     console.log("✅ Connected to MongoDB inside worker thread");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1); // Exit worker if DB connection fails
//   }
// };

// // ✅ Function to insert data in small chunks
// async function insertDataInChunks(data) {
//   const chunkSize = 500;
//   for (let i = 0; i < data.length; i += chunkSize) {
//     try {
//       console.log(`🔹 Inserting chunk ${i / chunkSize + 1}...`);
//       await User.insertMany(data.slice(i, i + chunkSize), { ordered: false });
//       console.log(`✅ Chunk ${i / chunkSize + 1} inserted successfully`);
//     } catch (err) {
//       console.error("❌ Error inserting chunk:", err.message);
//     }
//   }
// }

// // ✅ Function to process CSV file
// async function processFile() {
//   await connectDB(); // Ensure DB connection

//   try {
//     const jsonArray = await csvtojson().fromFile(filePath);

//     if (jsonArray.length === 0) {
//       console.error("❌ No data found in CSV file!");
//       parentPort.postMessage("❌ No data in CSV file");
//       return;
//     }

//     console.log("🔹 Sample Data:", jsonArray.slice(0, 5)); // ✅ Log first 5 records

//     await insertDataInChunks(jsonArray);
//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     mongoose.connection.close();
//     console.log("🔹 MongoDB connection closed inside worker");
//   }
// }

// processFile();

// const { parentPort } = require("worker_threads");
// const csvtojson = require("csvtojson");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // ✅ Import Models
// const User = require("../models/User");
// const Agent = require("../models/Agent");
// const Account = require("../models/Account");
// const Policy = require("../models/Policy");
// const Carrier = require("../models/PolicyCarrier");
// const Category = require("../models/PolicyCategory");

// const filePath = path.resolve(__dirname, "../csv/sheet.csv");

// // ✅ Connect to MongoDB
// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       console.log("✅ Already connected to MongoDB");
//       return;
//     }

//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000, // 50 sec timeout
//       socketTimeoutMS: 45000,
//       bufferCommands: false, // No command buffering
//     });

//     console.log("✅ Connected to MongoDB inside worker thread");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1);
//   }
// };

// // ✅ Upsert (Update or Insert) Function
// async function upsertData(Model, filter, updateData, name) {
//   try {
//     await Model.findOneAndUpdate(filter, updateData, { upsert: true, new: true });
//     console.log(`✅ ${name} updated successfully`);
//   } catch (err) {
//     console.error(`❌ Error updating ${name}:`, err.message);
//   }
// }

// // ✅ Process CSV and Insert Data
// async function processFile() {
//   await connectDB();

//   try {
//     const jsonArray = await csvtojson().fromFile(filePath);

//     if (jsonArray.length === 0) {
//       console.error("❌ No data found in CSV file!");
//       parentPort.postMessage("❌ No data in CSV file");
//       return;
//     }

//     console.log("🔹 Sample Data:", jsonArray.slice(0, 5));

//     for (const item of jsonArray) {
//       // ✅ Upsert User
//       await upsertData(
//         User,
//         { email: item["email"] },
//         {
//           firstName: item["firstname"],
//           dob: item["dob"],
//           address: item["address"],
//           phone: item["phone"],
//           state: item["state"],
//           zipCode: item["zip"],
//           email: item["email"],
//           gender: item["gender"],
//           userType: item["userType"],
//         },
//         "User"
//       );

//       // ✅ Upsert Agent
//       await upsertData(Agent, { agentName: item["agent"] }, { agentName: item["agent"] }, "Agent");

//       // ✅ Upsert Account
//       await upsertData(Account, { accountName: item["account_name"] }, { accountName: item["account_name"], accountType: item["account_type"] }, "Account");

//       // ✅ Upsert Policy
//       await upsertData(
//         Policy,
//         { policyNumber: item["policy_number"] },
//         {
//           policyNumber: item["policy_number"],
//           policyStartDate: item["policy_start_date"],
//           policyEndDate: item["policy_end_date"],
//           categoryName: item["category_name"],
//           companyName: item["company_name"],
//           premiumAmountWritten: item["premium_amount_written"],
//           premiumAmount: item["premium_amount"],
//           policyType: item["policy_type"],
//           hasActivePolicy: item["hasActive ClientPolicy"] === "true", // ✅ FIX: Convert string to Boolean
//         },
//         "Policy"
//       );

//       // ✅ Upsert Carrier
//       await upsertData(Carrier, { companyName: item["company_name"] }, { companyName: item["company_name"] }, "Carrier");

//       // ✅ Upsert Category
//       await upsertData(Category, { categoryName: item["category_name"] }, { categoryName: item["category_name"] }, "Category");
//     }

//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     mongoose.connection.close();
//     console.log("🔹 MongoDB connection closed inside worker");
//   }
// }

// processFile();

// const { parentPort } = require("worker_threads");
// const csvtojson = require("csvtojson");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // ✅ Import Models
// const User = require("../models/User");
// const Agent = require("../models/Agent");
// const Account = require("../models/Account");
// const Policy = require("../models/Policy");
// const Carrier = require("../models/PolicyCarrier");
// const Category = require("../models/PolicyCategory");

// const filePath = path.resolve(__dirname, "../csv/data-sheet.csv");

// // ✅ Connect to MongoDB
// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 1) {
//       console.log("✅ Already connected to MongoDB");
//       return;
//     }

//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000,
//       socketTimeoutMS: 45000,
//       bufferCommands: false,
//     });

//     console.log("✅ Connected to MongoDB inside worker thread");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1);
//   }
// };

// // ✅ Batch Upsert Function
// async function bulkUpsert(Model, records, uniqueField, name) {
//   if (records.length === 0) return;

//   try {
//     const bulkOps = records.map((record) => ({
//       updateOne: {
//         filter: { [uniqueField]: record[uniqueField] },
//         update: { $set: record },
//         upsert: true,
//       },
//     }));

//     await Model.bulkWrite(bulkOps, { ordered: false });
//     console.log(`✅ ${name} batch updated successfully (${records.length} records)`);
//   } catch (err) {
//     console.error(`❌ Error updating ${name}:`, err.message);
//   }
// }

// // ✅ Process CSV and Insert Data
// async function processFile() {
//   await connectDB();

//   try {
//     const jsonArray = await csvtojson().fromFile(filePath);

//     if (jsonArray.length === 0) {
//       console.error("❌ No data found in CSV file!");
//       parentPort.postMessage("❌ No data in CSV file");
//       return;
//     }

//     console.log("🔹 Sample Data:", jsonArray.slice(0, 5));

//     // Batching records
//     const userRecords = [];
//     const agentRecords = [];
//     const accountRecords = [];
//     const policyRecords = [];
//     const carrierRecords = [];
//     const categoryRecords = [];

//     for (const item of jsonArray) {
//       const manualId = new mongoose.Types.ObjectId();
//       console.log("Generated ObjectId:", manualId.toString());
//       userRecords.push({
//         email: item["email"],
//         firstName: item["firstname"],
//         dob: item["dob"],
//         address: item["address"],
//         phone: item["phone"],
//         state: item["state"],
//         zipCode: item["zip"],
//         gender: item["gender"],
//         userType: item["userType"],
//         _id: manualId,
//       });

//       agentRecords.push({ agentName: item["agent"] });

//       accountRecords.push({
//         accountName: item["account_name"],
//         accountType: item["account_type"],
//       });

//       policyRecords.push({
//         policyNumber: item["policy_number"],
//         policyStartDate: item["policy_start_date"],
//         policyEndDate: item["policy_end_date"],
//         categoryName: item["categry_name"],
//         companyName: item["company_name"],
//         premiumAmountWritten: item["premium_amount_written"],
//         premiumAmount: item["premium_amount"],
//         policyType: item["policy_type"],
//         hasActivePolicy: item["hasActive ClientPolicy"] === "true",
//         userId: manualId,
//         userEmail: item.email,
//       });

//       carrierRecords.push({ companyName: item["company_name"] });

//       categoryRecords.push({ categoryName: item["category_name"] });

//       // Process in batches of 1000 for efficiency
//       if (userRecords.length >= 1000) {
//         await Promise.all([bulkUpsert(User, userRecords, "email", "User"), bulkUpsert(Agent, agentRecords, "agentName", "Agent"), bulkUpsert(Account, accountRecords, "accountName", "Account"), bulkUpsert(Policy, policyRecords, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierRecords, "companyName", "Carrier"), bulkUpsert(Category, categoryRecords, "categoryName", "Category")]);

//         // Clear arrays for next batch
//         userRecords.length = 0;
//         agentRecords.length = 0;
//         accountRecords.length = 0;
//         policyRecords.length = 0;
//         carrierRecords.length = 0;
//         categoryRecords.length = 0;
//       }
//     }

//     // Process remaining records
//     await Promise.all([bulkUpsert(User, userRecords, "email", "User"), bulkUpsert(Agent, agentRecords, "agentName", "Agent"), bulkUpsert(Account, accountRecords, "accountName", "Account"), bulkUpsert(Policy, policyRecords, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierRecords, "companyName", "Carrier"), bulkUpsert(Category, categoryRecords, "categoryName", "Category")]);

//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     mongoose.connection.close();
//     console.log("🔹 MongoDB connection closed inside worker");
//   }
// }

// processFile();

// const { parentPort } = require("worker_threads");
// const csv = require("csvtojson");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // ✅ Import Models
// const User = require("../models/User");
// const Agent = require("../models/Agent");
// const Account = require("../models/Account");
// const Policy = require("../models/Policy");
// const Carrier = require("../models/PolicyCarrier");
// const Category = require("../models/PolicyCategory");

// // Resolve the CSV file path from .env
// const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// // ✅ Connect to MongoDB
// const connectDB = async () => {
//   if (mongoose.connection.readyState !== 1) {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000,
//       socketTimeoutMS: 45000,
//       bufferCommands: false,
//     });
//     console.log("✅ Connected to MongoDB inside worker thread");
//   }
// };

// // ✅ Generic Bulk Upsert Function
// async function bulkUpsert(Model, records, uniqueField, modelName) {
//   if (records.length === 0) return;
//   try {
//     const bulkOps = records.map((record) => {
//       // Clone the record and remove _id from update data if present
//       const updateData = { ...record };
//       if (updateData._id) {
//         delete updateData._id;
//       }
//       return {
//         updateOne: {
//           filter: { [uniqueField]: record[uniqueField] },
//           update: { $set: updateData },
//           upsert: true,
//         },
//       };
//     });
//     await Model.bulkWrite(bulkOps, { ordered: false });
//     console.log(`✅ ${modelName} batch updated successfully (${records.length} records)`);
//   } catch (err) {
//     console.error(`❌ Error updating ${modelName}:`, err.message);
//   }
// }

// // ✅ Process CSV file using streaming and batch upserts
// async function processFile() {
//   await connectDB();

//   const batchSize = 5000;
//   let userBatch = [];
//   let agentBatch = [];
//   let accountBatch = [];
//   let policyBatch = [];
//   let carrierBatch = [];
//   let categoryBatch = [];
//   let processedCount = 0;

//   try {
//     await csv()
//       .fromFile(filePath)
//       .subscribe(
//         async (item) => {
//           // Only process row if email exists (required for User and Policy linking)
//           // if (!item["email"]) {
//           //   console.warn("Skipping row without email:", item);
//           //   return;
//           // }

//           // Generate manualId only if email exists
//           const manualId = new mongoose.Types.ObjectId();

//           // Prepare records for each collection
//           userBatch.push({
//             email: item["email"],
//             firstName: item["firstname"],
//             dob: item["dob"],
//             address: item["address"],
//             phone: item["phone"],
//             state: item["state"],
//             zipCode: item["zip"],
//             gender: item["gender"],
//             userType: item["userType"],
//             _id: manualId,
//           });

//           agentBatch.push({ agentName: item["agent"] });
//           accountBatch.push({
//             accountName: item["account_name"],
//             accountType: item["account_type"],
//           });
//           policyBatch.push({
//             policyNumber: item["policy_number"],
//             policyStartDate: item["policy_start_date"],
//             policyEndDate: item["policy_end_date"],
//             categoryName: item["category_name"] || item["categry_name"],
//             companyName: item["company_name"],
//             premiumAmountWritten: item["premium_amount_written"],
//             premiumAmount: item["premium_amount"],
//             policyType: item["policy_type"],
//             hasActivePolicy: item["hasActive ClientPolicy"] === "true",
//             userId: manualId,
//             userEmail: item["email"],
//           });
//           carrierBatch.push({ companyName: item["company_name"] });
//           categoryBatch.push({ categoryName: item["category_name"] });

//           processedCount++;
//           if (processedCount % batchSize === 0) {
//             await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//             // Clear batches for next set
//             userBatch = [];
//             agentBatch = [];
//             accountBatch = [];
//             policyBatch = [];
//             carrierBatch = [];
//             categoryBatch = [];
//           }
//         },
//         (err) => {
//           console.error("❌ Error during CSV processing:", err);
//           throw err;
//         },
//         async () => {
//           // Process any remaining records in batches
//           await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//         }
//       );

//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     // Do not close the connection here if it's causing issues.
//     console.log("🔹 Processing complete. Connection remains open.");
//   }
// }

// processFile();

// const { parentPort } = require("worker_threads");
// const csv = require("csvtojson");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // Import Models
// const User = require("../models/User");
// const Agent = require("../models/Agent");
// const Account = require("../models/Account");
// const Policy = require("../models/Policy");
// const Carrier = require("../models/PolicyCarrier");
// const Category = require("../models/PolicyCategory");

// // Resolve the CSV file path from .env
// const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// // Connect to MongoDB
// const connectDB = async () => {
//   if (mongoose.connection.readyState !== 1) {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000,
//       socketTimeoutMS: 45000,
//       bufferCommands: false,
//     });
//     console.log("✅ Connected to MongoDB inside worker thread");
//   }
// };

// // Generic Bulk Upsert Function
// async function bulkUpsert(Model, records, uniqueField, modelName) {
//   if (records.length === 0) return;
//   try {
//     const bulkOps = records.map((record) => {
//       // Clone the record and remove _id from update data if present
//       const updateData = { ...record };
//       if (updateData._id) {
//         delete updateData._id;
//       }
//       return {
//         updateOne: {
//           filter: { [uniqueField]: record[uniqueField] },
//           update: { $set: updateData },
//           upsert: true,
//         },
//       };
//     });
//     await Model.bulkWrite(bulkOps, { ordered: false });
//     console.log(`✅ ${modelName} batch updated successfully (${records.length} records)`);
//   } catch (err) {
//     console.error(`❌ Error updating ${modelName}:`, err.message);
//   }
// }

// // Process CSV file using streaming and batch upserts
// async function processFile() {
//   await connectDB();

//   const batchSize = 5000;
//   let userBatch = [];
//   let agentBatch = [];
//   let accountBatch = [];
//   let policyBatch = [];
//   let carrierBatch = [];
//   let categoryBatch = [];
//   let processedCount = 0;

//   try {
//     await csv()
//       .fromFile(filePath)
//       .subscribe(
//         async (item) => {
//           // Uncomment the following if email is required to process the row
//           // if (!item["email"]) {
//           //   console.warn("Skipping row without email:", item);
//           //   return;
//           // }

//           // Generate a manualId to link User and Policy
//           const manualId = new mongoose.Types.ObjectId();

//           // Prepare records for each collection
//           userBatch.push({
//             email: item["email"],
//             firstName: item["firstname"],
//             dob: item["dob"],
//             address: item["address"],
//             phone: item["phone"],
//             state: item["state"],
//             zipCode: item["zip"],
//             gender: item["gender"],
//             userType: item["userType"],
//             _id: manualId,
//           });

//           agentBatch.push({ agentName: item["agent"] });

//           accountBatch.push({
//             accountName: item["account_name"],
//             accountType: item["account_type"],
//           });

//           policyBatch.push({
//             policyNumber: item["policy_number"], // Use policyNumber as unique identifier
//             policyStartDate: item["policy_start_date"],
//             policyEndDate: item["policy_end_date"],
//             categoryName: item["category_name"] || item["categry_name"],
//             companyName: item["company_name"],
//             premiumAmountWritten: item["premium_amount_written"],
//             premiumAmount: item["premium_amount"],
//             policyType: item["policy_type"],
//             hasActivePolicy: item["hasActive ClientPolicy"] === "true",
//             userId: manualId, // Link to the user
//             userEmail: item["email"], // Duplicate emails allowed
//           });

//           carrierBatch.push({ companyName: item["company_name"] });
//           categoryBatch.push({ categoryName: item["category_name"] });

//           processedCount++;
//           if (processedCount % batchSize === 0) {
//             await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//             // Clear batches for next set
//             userBatch = [];
//             agentBatch = [];
//             accountBatch = [];
//             policyBatch = [];
//             carrierBatch = [];
//             categoryBatch = [];
//           }
//         },
//         (err) => {
//           console.error("❌ Error during CSV processing:", err);
//           throw err;
//         },
//         async () => {
//           // Process any remaining records in batches
//           await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//         }
//       );

//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     // Optionally, close the connection here if needed.
//     console.log("🔹 Processing complete. Connection remains open.");
//   }
// }

// processFile();

// const { parentPort } = require("worker_threads");
// const csv = require("csvtojson");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // Import Models
// const User = require("../models/User");
// const Agent = require("../models/Agent");
// const Account = require("../models/Account");
// const Policy = require("../models/Policy");
// const Carrier = require("../models/PolicyCarrier");
// const Category = require("../models/PolicyCategory");

// // Resolve the CSV file path from .env
// const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// // Connect to MongoDB
// const connectDB = async () => {
//   if (mongoose.connection.readyState !== 1) {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000,
//       socketTimeoutMS: 45000,
//       bufferCommands: false,
//     });
//     console.log("✅ Connected to MongoDB inside worker thread");

//     // Attempt to drop the unique index on userEmail if it exists
//     try {
//       await Policy.collection.dropIndex("userEmail_1");
//       console.log("✅ Dropped unique index 'userEmail_1' from Policy collection");
//     } catch (err) {
//       // If the error indicates the index doesn't exist, ignore it.
//       if (err.codeName === "IndexNotFound") {
//         console.log("ℹ️ Unique index 'userEmail_1' not found, skipping drop index");
//       } else {
//         console.error("❌ Error dropping index:", err.message);
//       }
//     }
//   }
// };

// // Generic Bulk Upsert Function (excludes _id from update data)
// async function bulkUpsert(Model, records, uniqueField, modelName) {
//   if (records.length === 0) return;
//   try {
//     const bulkOps = records.map((record) => {
//       const updateData = { ...record };
//       if (updateData._id) delete updateData._id;
//       return {
//         updateOne: {
//           filter: { [uniqueField]: record[uniqueField] },
//           update: { $set: updateData },
//           upsert: true,
//         },
//       };
//     });
//     await Model.bulkWrite(bulkOps, { ordered: false });
//     console.log(`✅ ${modelName} batch updated successfully (${records.length} records)`);
//   } catch (err) {
//     console.error(`❌ Error updating ${modelName}:`, err.message);
//   }
// }

// // Process CSV file using streaming and batch upserts
// async function processFile() {
//   await connectDB();

//   const batchSize = 5000;
//   let userBatch = [];
//   let agentBatch = [];
//   let accountBatch = [];
//   let policyBatch = [];
//   let carrierBatch = [];
//   let categoryBatch = [];
//   let processedCount = 0;

//   try {
//     await csv()
//       .fromFile(filePath)
//       .subscribe(
//         async (item) => {
//           // Optionally, skip rows missing an email if email is required
//           // if (!item["email"]) return;

//           // Generate a manualId to link User and Policy
//           const manualId = new mongoose.Types.ObjectId();

//           // Prepare records for each collection
//           userBatch.push({
//             email: item["email"],
//             firstName: item["firstname"],
//             dob: item["dob"],
//             address: item["address"],
//             phone: item["phone"],
//             state: item["state"],
//             zipCode: item["zip"],
//             gender: item["gender"],
//             userType: item["userType"],
//             _id: manualId,
//           });

//           agentBatch.push({ agentName: item["agent"] });

//           accountBatch.push({
//             accountName: item["account_name"],
//             accountType: item["account_type"],
//           });

//           policyBatch.push({
//             policyNumber: item["policy_number"],
//             policyStartDate: item["policy_start_date"],
//             policyEndDate: item["policy_end_date"],
//             categoryName: item["category_name"] || item["categry_name"],
//             companyName: item["company_name"],
//             premiumAmountWritten: item["premium_amount_written"],
//             premiumAmount: item["premium_amount"],
//             policyType: item["policy_type"],
//             hasActivePolicy: item["hasActive ClientPolicy"] === "true",
//             userId: manualId,
//             userEmail: item["email"],
//           });

//           carrierBatch.push({ companyName: item["company_name"] });
//           categoryBatch.push({ categoryName: item["category_name"] });

//           processedCount++;
//           if (processedCount % batchSize === 0) {
//             await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//             // Clear batches for next set
//             userBatch = [];
//             agentBatch = [];
//             accountBatch = [];
//             policyBatch = [];
//             carrierBatch = [];
//             categoryBatch = [];
//           }
//         },
//         (err) => {
//           console.error("❌ Error during CSV processing:", err);
//           throw err;
//         },
//         async () => {
//           // Process any remaining records in batches
//           await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//         }
//       );
//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     console.log("🔹 Processing complete. Connection remains open.");
//   }
// }

// processFile();

// const { parentPort } = require("worker_threads");
// const csv = require("csvtojson");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// // Import Models
// const User = require("../models/User");
// const Agent = require("../models/Agent");
// const Account = require("../models/Account");
// const Policy = require("../models/Policy");
// const Carrier = require("../models/PolicyCarrier");
// const Category = require("../models/PolicyCategory");

// // Resolve the CSV file path from .env
// const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// // Connect to MongoDB
// const connectDB = async () => {
//   if (mongoose.connection.readyState !== 1) {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000,
//       socketTimeoutMS: 45000,
//       bufferCommands: false,
//     });
//     console.log("✅ Connected to MongoDB inside worker thread");

//     // Attempt to drop the unique index on userEmail if it exists
//     try {
//       await Policy.collection.dropIndex("userEmail_1");
//       console.log("✅ Dropped unique index 'userEmail_1' from Policy collection");
//     } catch (err) {
//       // If the error indicates the index doesn't exist, ignore it.
//       if (err.codeName === "IndexNotFound") {
//         console.log("ℹ️ Unique index 'userEmail_1' not found, skipping drop index");
//       } else {
//         console.error("❌ Error dropping index:", err.message);
//       }
//     }
//   }
// };

// // Generic Bulk Upsert Function (excludes _id from update data)
// async function bulkUpsert(Model, records, uniqueField, modelName) {
//   if (records.length === 0) return;
//   try {
//     const bulkOps = records.map((record) => {
//       const updateData = { ...record };
//       if (updateData._id) delete updateData._id;
//       return {
//         updateOne: {
//           filter: { [uniqueField]: record[uniqueField] },
//           update: { $set: updateData },
//           upsert: true,
//         },
//       };
//     });
//     await Model.bulkWrite(bulkOps, { ordered: false });
//     console.log(`✅ ${modelName} batch updated successfully (${records.length} records)`);
//   } catch (err) {
//     console.error(`❌ Error updating ${modelName}:`, err.message);
//   }
// }

// // Process CSV file using streaming and batch upserts
// async function processFile() {
//   await connectDB();

//   const batchSize = 5000;
//   let userBatch = [];
//   let agentBatch = [];
//   let accountBatch = [];
//   let policyBatch = [];
//   let carrierBatch = [];
//   let categoryBatch = [];
//   let processedCount = 0;

//   try {
//     await csv()
//       .fromFile(filePath)
//       .subscribe(
//         async (item) => {
//           // Optionally, skip rows missing an email if email is required
//           // if (!item["email"]) return;

//           // Generate a manualId to link User and Policy
//           const manualId = new mongoose.Types.ObjectId();

//           // Prepare records for each collection
//           userBatch.push({
//             email: item["email"],
//             firstName: item["firstname"],
//             dob: item["dob"],
//             address: item["address"],
//             phone: item["phone"],
//             state: item["state"],
//             zipCode: item["zip"],
//             gender: item["gender"],
//             userType: item["userType"],
//             _id: manualId,
//           });

//           agentBatch.push({ agentName: item["agent"] });

//           accountBatch.push({
//             accountName: item["account_name"],
//             accountType: item["account_type"],
//           });

//           policyBatch.push({
//             policyNumber: item["policy_number"],
//             policyStartDate: item["policy_start_date"],
//             policyEndDate: item["policy_end_date"],
//             categoryName: item["category_name"] || item["categry_name"],
//             companyName: item["company_name"],
//             premiumAmountWritten: item["premium_amount_written"],
//             premiumAmount: item["premium_amount"],
//             policyType: item["policy_type"],
//             hasActivePolicy: item["hasActive ClientPolicy"] === "true",
//             userId: manualId,
//             userEmail: item["email"],
//           });

//           carrierBatch.push({ companyName: item["company_name"] });
//           categoryBatch.push({ categoryName: item["category_name"] });

//           processedCount++;
//           if (processedCount % batchSize === 0) {
//             await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//             // Clear batches for next set
//             userBatch = [];
//             agentBatch = [];
//             accountBatch = [];
//             policyBatch = [];
//             carrierBatch = [];
//             categoryBatch = [];
//           }
//         },
//         (err) => {
//           console.error("❌ Error during CSV processing:", err);
//           throw err;
//         },
//         async () => {
//           // Process any remaining records in batches
//           await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
//         }
//       );
//     parentPort.postMessage("✅ File processed successfully");
//   } catch (err) {
//     console.error("❌ Error processing file:", err.message);
//     parentPort.postMessage("❌ Error processing file");
//   } finally {
//     console.log("🔹 Processing complete. Connection remains open.");
//   }
// }

// processFile();

const { parentPort } = require("worker_threads");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Import Models
const User = require("../models/User");
const Agent = require("../models/Agent");
const Account = require("../models/Account");
const Policy = require("../models/Policy");
const Carrier = require("../models/PolicyCarrier");
const Category = require("../models/PolicyCategory");

// Resolve the CSV file path from .env
const filePath = path.resolve(__dirname, process.env.FILE_PATH);

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });
    console.log("✅ Connected to MongoDB inside worker thread");

    // Attempt to drop the unique index on userEmail if it exists
    try {
      await Policy.collection.dropIndex("userEmail_1");
      console.log("✅ Dropped unique index 'userEmail_1' from Policy collection");
    } catch (err) {
      // If the error indicates the index doesn't exist, ignore it.
      if (err.codeName === "IndexNotFound") {
        console.log("ℹ️ Unique index 'userEmail_1' not found, skipping drop index");
      } else {
        console.error("❌ Error dropping index:", err.message);
      }
    }
  }
};

// Generic Bulk Upsert Function (excludes _id from update data)
async function bulkUpsert(Model, records, uniqueField, modelName) {
  if (records.length === 0) return;
  try {
    const bulkOps = records.map((record) => {
      const updateData = { ...record };
      if (updateData._id) delete updateData._id;
      return {
        updateOne: {
          filter: { [uniqueField]: record[uniqueField] },
          update: { $set: updateData },
          upsert: true,
        },
      };
    });
    await Model.bulkWrite(bulkOps, { ordered: false });
    console.log(`✅ ${modelName} batch updated successfully (${records.length} records)`);
  } catch (err) {
    console.error(`❌ Error updating ${modelName}:`, err.message);
  }
}

// Process CSV file using streaming and batch upserts
async function processFile() {
  await connectDB();

  const batchSize = 5000;
  let userBatch = [];
  let agentBatch = [];
  let accountBatch = [];
  let policyBatch = [];
  let carrierBatch = [];
  let categoryBatch = [];
  let processedCount = 0;

  try {
    await csv()
      .fromFile(filePath)
      .subscribe(
        async (item) => {
          // Optionally, skip rows missing an email if email is required
          // if (!item["email"]) return;

          // Generate a manualId to link User and Policy for this row
          const manualId = new mongoose.Types.ObjectId();

          console.log(manualId);

          // Prepare the User record with manualId as _id
          userBatch.push({
            email: item["email"],
            firstName: item["firstname"],
            dob: item["dob"],
            address: item["address"],
            phone: item["phone"],
            state: item["state"],
            zipCode: item["zip"],
            gender: item["gender"],
            userType: item["userType"],
            _id: manualId,
          });

          // Prepare the Agent record
          agentBatch.push({ agentName: item["agent"] });

          // Prepare the Account record
          accountBatch.push({
            accountName: item["account_name"],
            accountType: item["account_type"],
          });

          // Prepare the Policy record using the same manualId as userId
          policyBatch.push({
            policyNumber: item["policy_number"],
            policyStartDate: item["policy_start_date"],
            policyEndDate: item["policy_end_date"],
            categoryName: item["category_name"] || item["categry_name"],
            companyName: item["company_name"],
            premiumAmountWritten: item["premium_amount_written"],
            premiumAmount: item["premium_amount"],
            policyType: item["policy_type"],
            hasActivePolicy: item["hasActive ClientPolicy"] === "true",
            userId: manualId, // Same ID linking Policy to User
            userEmail: item["email"],
          });

          // Prepare Carrier and Category records
          carrierBatch.push({ companyName: item["company_name"] });
          categoryBatch.push({ categoryName: item["category_name"] });

          processedCount++;
          if (processedCount % batchSize === 0) {
            await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
            // Clear batches for next set
            userBatch = [];
            agentBatch = [];
            accountBatch = [];
            policyBatch = [];
            carrierBatch = [];
            categoryBatch = [];
          }
        },
        (err) => {
          console.error("❌ Error during CSV processing:", err);
          throw err;
        },
        async () => {
          // Process any remaining records in batches
          await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
        }
      );
    parentPort.postMessage("✅ File processed successfully");
  } catch (err) {
    console.error("❌ Error processing file:", err.message);
    parentPort.postMessage("❌ Error processing file");
  } finally {
    console.log("🔹 Processing complete. Connection remains open.");
  }
}

processFile();
