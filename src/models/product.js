import mongoose, { set } from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    startPrice: { type: Number, required: true },
    reservePrice: { type: Number, required: true }
});

productSchema.index({ title: "text", description: "text" }); // Create text for title and description to allow keyword search.
productSchema.index({ startPrice: 1, reservePrice: 1 }); // Compound index the pricing to improve range queries.

export const Product = mongoose.model("Product", productSchema);