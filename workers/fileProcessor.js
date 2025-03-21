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
    console.log(" Connected to MongoDB inside worker thread");

    // Attempt to drop the unique index on userEmail if it exists
    try {
      await Policy.collection.dropIndex("userEmail_1");
      console.log(" Dropped unique index 'userEmail_1' from Policy collection");
    } catch (err) {
      // If the error indicates the index doesn't exist, ignore it.
      if (err.codeName === "IndexNotFound") {
        console.log("ℹ Unique index 'userEmail_1' not found, skipping drop index");
      } else {
        console.error(" Error dropping index:", err.message);
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
    console.log(` ${modelName} batch updated successfully (${records.length} records)`);
  } catch (err) {
    console.error(` Error updating ${modelName}:`, err.message);
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
          console.error(" Error during CSV processing:", err);
          throw err;
        },
        async () => {
          // Process any remaining records in batches
          await Promise.all([bulkUpsert(User, userBatch, "email", "User"), bulkUpsert(Agent, agentBatch, "agentName", "Agent"), bulkUpsert(Account, accountBatch, "accountName", "Account"), bulkUpsert(Policy, policyBatch, "policyNumber", "Policy"), bulkUpsert(Carrier, carrierBatch, "companyName", "Carrier"), bulkUpsert(Category, categoryBatch, "categoryName", "Category")]);
        }
      );
    parentPort.postMessage(" File processed successfully");
  } catch (err) {
    console.error(" Error processing file:", err.message);
    parentPort.postMessage(" Error processing file");
  } finally {
    console.log(" Processing complete. Connection remains open.");
  }
}

processFile();
