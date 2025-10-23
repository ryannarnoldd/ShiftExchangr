import "dotenv/config";
import express from "express";
// import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
// import schema from "./schema.js"; // import your GraphQL schema

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
    

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${4000}`));
