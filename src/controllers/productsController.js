// productsControllers.js

// Imports
import { searchWithGemini } from "../services/geminiServices.js";
import { getAllProducts, getProductByTitle } from "../services/productsServices.js";


// Searches for product by a search phrase. Utilizes AI to break up into keywords and determine which search function is ideal to use in querying the database.
export const searchByPhrase = async (req, res) => {
    const { keywords } = req.query;
    if (!keywords?.trim())
        return res.status(400).json({ error: "Missing 'keywords' query or empty search phrase entered. Please use ?keywords={...}." })

    try {
        const foundProducts = await searchWithGemini(keywords);
        if (!Array.isArray(foundProducts))
            return res.status(404).json({ error: foundProducts});

        if (foundProducts.length > 0)
            return res.status(200).json(foundProducts)
        else
            return res.status(404).json({ error: "No Matches found" })
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}


// Returns all products in database.
export const allProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        
        if (products.length <= 0)
            return res.status(404).json({ error: "No products found. The database is empty!" });

        return res.status(200).json(products);

    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message)
    }
}


// Retrieves a single product that has an exact match with the URL parameter on /api/products/:title
export const productByTitle = async (req, res) => {
    const { title } = req.params;
    if (!title?.trim())
        return res.status(400).json({ error: "Product name must be specified"})
    
    try {
        const products = await getProductByTitle(title);
        if (products.length <= 0)
            return res.status(404).json({ error: `The product '${title} could not be found or does not exist.'`});

        return res.status(200).json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}