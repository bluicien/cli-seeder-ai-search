// config.js

import dotenv from "dotenv";

// Initialize dotenv for environment variables.
dotenv.config();

// Setup configuration object.
const config = {
    port: process.env.PORT ?? 4000,
    mongoUri: process.env.MONGO_URI,
    geminiApiKey: process.env.GEMINI_API_KEY
}


export default config;