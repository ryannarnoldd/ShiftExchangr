import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// (Localhost)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://\'localhost:27017')
.then(() => {
    console.log('Connected to MongoDB SHIFTS');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const db = mongoose.connection;

export default db;