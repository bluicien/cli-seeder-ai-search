import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongoDB } from "./db/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

connectMongoDB();

app.get("/", (req, res) => {
    res.send("Server is running.");
});










app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})