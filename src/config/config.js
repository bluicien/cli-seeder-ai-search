// config.js

import dotenv from "dotenv";

// Initialize dotenv for environment variables.
dotenv.config();

// Setup configuration object.
const config = {
    port: process.env.PORT ?? 4000,
    mongoUri: `${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB_NAME}`,
    geminiApiKey: process.env.GEMINI_API_KEY
}


export default config;