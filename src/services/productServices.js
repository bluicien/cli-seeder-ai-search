import { Product } from "../models/product";

export const getAllProducts = async () => {
    const allProducts = await Product.find({});
    return allProducts;
}

export const getProductByTitle = async (title) => {
    if (!title) return null; // If no product is entered. Return nothing.

    const product = await Product.find({title});
    return product;
}

export const addProduct = async (title, description = "", startPrice, reservePrice) => {
    if (!title && isNaN(startPrice) && isNaN(reservePrice)) {
        console.error("Missing required data fields, or invalid data types.");
        return;
    }

    const newProduct = new Product({
        title: title, description,
        description: description, 
        startPrice: Number(startPrice),
        reservePrice: Number(reservePrice)
    });
    newProduct.save();

}

export const deleteProductById = async (_id) => {
    if (!_id) return;

    await Product.deleteOne({_id});
    return;
}