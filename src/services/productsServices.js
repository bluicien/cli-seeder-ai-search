import chalk from "chalk";
import { Product } from "../models/product.js";

export const getAllProducts = async () => {
    try {
        const allProducts = await Product.find({});
        return allProducts;
    } catch (err) {
        console.error(err);   
    }
}

export const getProductById = async (_id) => {
    if (!_id) return null;

    try {
        const product = await Product.findById(_id);
        return product;
    } catch (err) {
        console.error(err);
    }
}

export const getProductByTitle = async (title) => {
    if (!title) return null; // If no product is entered. Return nothing.

    console.log("Searching with", title);
    try {
        const product = await Product.find({
            title: { $regex: title, $options: "i" }
        });
        return product;
    } catch (err) {
        console.error(err);
    }
}

export const addProduct = async (title, description = "", startPrice, reservePrice) => {
    if (!title || isNaN(startPrice) || isNaN(reservePrice)) {
        console.error("Missing required data fields, or invalid data types.");
        return;
    }

    try {
        const newProduct = new Product({
            title: title,
            description: description,
            startPrice: Number(startPrice),
            reservePrice: Number(reservePrice)
        });
        await newProduct.save();
        
        return newProduct;
    } catch (err) {
        console.error(err);
    }
}

export const addProductsFromList = async (arrayOfProducts) => {
    try {
        if (!Array.isArray(arrayOfProducts)) {
            throw new Error("Type Error: Please enter a valid array")
        };

        console.log("Products to Insert: ", arrayOfProducts)
        await Product.insertMany(arrayOfProducts);

    } catch (err) {
        console.error(err.message);
    }
    
}

export const deleteProductById = async (_id) => {
    if (!_id) return;

    try {
        const deletedProduct = await Product.deleteOne({_id});
        console.info(chalk.green.bold("Product has been deleted: "), deletedProduct);
        return;
    } catch (err) {
        console.error(err);
    }
}

export const deleteAllProducts = async () => {
    try {
        await Product.deleteMany({});
        console.info(chalk.green.bold("Database has been cleared!"));
        return;
    } catch (err) {
        console.error(err);
    }
}