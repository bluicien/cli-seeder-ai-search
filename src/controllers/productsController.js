import { searchWithGemini } from "../services/geminiServices.js";


export const searchKeyword = async (req, res) => {
    const { keywords } = req.body;
    const foundProduct = await searchWithGemini(keywords);
    res.status(200).json(foundProduct)
}