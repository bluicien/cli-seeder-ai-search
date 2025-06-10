// productsServices.js

import { Product } from "../models/product.js";
import { errorAlert, information, success, warning } from "../utils/chalkSchema.js";


/**
 * Retrieves all documents from products collection.
 * @returns List of products
 */
export const getAllProducts = async () => {
    try {
        console.log(information("Querying all products..."))
        const allProducts = await Product.find({});

        return allProducts;

    } catch (err) {  
        console.error(errorAlert("", err));
    }
}


/**
 * Queries MongoDB for a match to the ObjectId (_id) passed as argument.
 * @param {string} _id - ObjectId string that is used to match the _id in MongoDB.
 * @returns Returns a single document object.
 */
export const getProductById = async (_id) => {
    if (!_id) return null;

    try {
        console.log(information(`Querying products by _id: ${informationHeading(_id)}`))
        const product = await Product.findById(_id);

        return product;

    } catch (err) {
        console.error(errorAlert("", err));
    }
}


/**
 * Queries MongoDB for exact matches to the string passed as argument.
 * @param {string} title - Title of the product.
 * @returns Returns an array of the product(s) found.
 */
export const getProductByTitle = async (title) => {
    if (!title) return [];

    try {
        console.log(information(`Querying exact match for title: ${informationHeading(title)}`))
        const product = await Product.find({
            title: { $regex: `^${title}$`, $options: "i" }
        });

        return product

    } catch (err) {
        console.error(errorAlert("", err));
    }
}


/**
 * Queries MongoDB for partial matches of the string passed as argument.
 * @param {string} title - Partial match of product title.
 * @returns Returns an array of the product(s) found.
 */
export const getProductByTitlePartialMatch = async (title) => {
    if (!title) return []; // If no product is entered. Return empty array.

    console.log(information(`Querying partial match for title: ${informationHeading(title)}`))
    try {
        const product = await Product.find({
            title: { $regex: title, $options: "i" }
        });

        return product;

    } catch (err) {
        console.error(errorAlert("", err));
    }
}


/**
 * 
 * @param {string} keywords 
 * @returns 
 */
export const getProductsByKeywords = async (keywords) => {
    if (!Array.isArray(keywords)) throw new Error("ERROR: Argument must be an array"); // Throw error if argument is not array
    if (keywords.length <= 0) return []; // Return empty array if no keywords entered.
    const searchKeywords  = keywords.join(" ");

    try {
        console.log(information(`Querying by keywords: ${informationHeading(keywords)}`))
        const products = await Product.find(
            { $text: { $search: searchKeywords } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        return products;

    } catch (err) {
        console.error(errorAlert("", err));
    }
}


/**
 * This function adds a single new product into MongoDB via Mongoose.
 * @param {string} title - Title/Name of the product.
 * @param {string} description - Description of the product (optional).
 * @param {number} startPrice - Starting price for the product.
 * @param {number} reservePrice - Reserve price, minimum bid for auction.
 * @returns The new product that was created.
 */
export const addProduct = async (title, description = "", startPrice, reservePrice) => {
    if (!title || isNaN(startPrice) || isNaN(reservePrice)) {
        throw new Error("Missing required data fields, or invalid data types.");
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
        console.error(errorAlert("", err));
    }
}


/**
 * This function takes an array of product objects and inserts into MongoDB via Mongoose.
 * @param {string[]} arrayOfProducts
 * @returns Returns a void Promise.
 */
export const addProductsFromList = async (arrayOfProducts) => {
    try {
        if (!Array.isArray(arrayOfProducts)) {
            throw new Error("Type Error: Please enter a valid array")
        };

        console.log(information("Inserting products: "), arrayOfProducts)
        await Product.insertMany(arrayOfProducts);

        return;

    } catch (err) {
        console.error(errorAlert("", err));
    }
}


/**
 * Takes a MongoDB ObjectId string as argument and deletes one product matching the _id.
 * @param {string} _id - ObjectId string that is used to match the _id in MongoDB.
 * @returns 
 */
export const deleteProductById = async (_id) => {
    if (!_id) return;

    try {
        const deletedProduct = await Product.deleteOne({_id});
        console.info(success("Product has been deleted: "), deletedProduct);
        return;

    } catch (err) {
        console.error(errorAlert("", err));
    }
}


/**
 * Clears all entries in products database.
 * @returns Returns a void promise
 */
export const deleteAllProducts = async () => {
    try {
        await Product.deleteMany({});
        console.info(success("Database has been cleared!"));
        return;

    } catch (err) {
        console.error(errorAlert("", err));
    }
}