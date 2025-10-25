import "dotenv/config";
import express from "express";
// import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI as string;

console.log("Connecting to MongoDB..., using URI:", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/graphql");
// 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${4000},`));
