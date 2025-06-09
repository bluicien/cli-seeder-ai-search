// server.js

// Package imports.
import express from "express";
import cors from "cors";

// File imports.
import { connectMongoDB } from "./db/db.js";
import productsRouter from "./routes/productsRoutes.js";
import config from "./config/config.js";

const app = express(); // Initialize express.

app.use(cors()); // Set cors policy.
app.use(express.json()); // Parse json in request body.

connectMongoDB(); // Connect to MongoDB server.

// Test endpoint.
app.get("/", (req, res) => {
    res.send("Server is running.");
});

app.use("/api/products", productsRouter); // Connect to productsRouter.

// Set port for server to listen on.
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
})