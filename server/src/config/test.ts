import mongoose from "mongoose";

const uri = "mongodb+srv://ryannarnoldd:password101@ShiftExchangr.n5feed0.mongodb.net/shifts";
await mongoose.connect(uri);
console.log("Connected");

const db = mongoose.connection.db;
if (!db) {
  throw new Error("Database connection is not available");
}
const result = await db.collection("shifts").find({}).toArray();
console.log(result);