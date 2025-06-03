import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String },
    startPrice: { type: String, required: true },
    reservePrice: { type: String, required: true }
});

export const Product = mongoose.model("Product", productSchema);