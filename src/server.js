// server.js
import express from "express";
import cors from "cors";

import { connectMongoDB } from "./db/db.js";
import productRouter from "./routes/productsRoutes.js";
import config from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());

connectMongoDB();

app.get("/", (req, res) => {
    res.send("Server is running.");
});

app.use("/api/products", productRouter);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
})