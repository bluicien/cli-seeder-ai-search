import { searchWithGemini } from "../services/geminiServices.js";


export const searchByPhrase = async (req, res) => {
    const { searchPhrase } = req.body;
    const foundProduct = await searchWithGemini(searchPhrase);
    res.status(200).json(foundProduct)
}