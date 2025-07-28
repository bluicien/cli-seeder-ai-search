// db.js

import mongoose from "mongoose";
import config from "../config/config.js";

// Connect to MongoDB
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoUri); // Connect to MongoDB.
    } catch (err) {
        console.error("Failed to connect to MongoDB Server", err); // Log error to console on error.
    }

    // Listen for error event even after successful connection.
    mongoose.connection.on('error', err => {
        console.error("Disconnected from MongoDB", err);
        
    });
}

