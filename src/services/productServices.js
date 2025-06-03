import { Product } from "../models/product";

export const getAllProducts = () => {
    const allProducts = Product.find({});
}