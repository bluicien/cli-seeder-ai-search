import mongoose, { set } from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String },
    startPrice: { type: Number, required: true },
    reservePrice: { type: Number, required: true }
});

export const Product = mongoose.model("Product", productSchema);