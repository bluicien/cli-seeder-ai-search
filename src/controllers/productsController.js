import { getProductByTitle } from "../services/productsServices";
import express from "express";

export const searchKeyword = async (req, res) => {
    const { keywords } = req.body;
    const foundProduct = getProductByTitle(keywords)
    res.status(200).json(foundProduct)
}