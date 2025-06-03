import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB.
        console.log("Connected to MongoDB.")
    } catch (err) {
        console.error("Failed to connect to MongoDB Server", err); // Log error to console on error.
    }

    // Listen for error event even after successful connection.
    mongoose.connection.on('error', err => {
        console.error("Disconnected from MongoDB", err);
        
    });
}

