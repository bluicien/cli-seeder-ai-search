// functionDeclarations.js

import { Type } from "@google/genai";
import { getProductByTitle, getProductByTitlePartialMatch, getProductsByKeywords } from "../services/productsServices.js";


// Function declaration for the 'getProductByTitle' function.
const fetchProductByTitleFunctionDeclaration = {
    name: "fetchProductByTitle",
    description: "Retrieves one or more products that exactly match the given title.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            title: {
                type: Type.STRING,
                description: "The exact title of the product to search for."
            }
        },
        required: ["title"]
    }
}


// Function declaration for the 'getProductByTitlePartialMatch' function.
const fetchProductsByTitlePartialMatchFunctionDeclaration = {
    name: "fetchProductByTitlePartialMatch",
    description: "Retrieves products whose title contains the given search term. For example, searching 'keyboard' will return 'Gaming Keyboard' and 'Mechanical Keyboard'.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            title: {
                type: Type.STRING,
                description: "A partial or full title to search within product names."
            }
        },
        required: ["title"]
    }
}


// Function declaration for the 'fetchProductsByKeywordsDeclaration' function.
const fetchProductsByKeywordsDeclaration = {
    name: "fetchProductsByKeywords",
    description: "Retrieves products where the title or description contains any of the specified keywords.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            arrayOfKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of keywords to search for in product titles or descriptions."
            }
        },
        required: ["arrayOfKeywords"]
    }
}


// Function toolkit object to be called based on Gemini AI selection.
export const functionsToolKit = {
    fetchProductByTitle: ({ title }) => getProductByTitle(title),
    fetchProductByTitlePartialMatch: ({ title }) => getProductByTitlePartialMatch(title),
    fetchProductsByKeywords: ({ arrayOfKeywords }) => getProductsByKeywords(arrayOfKeywords),
};


// Function declarations array to be passed to Gemini AI.
export const productFunctions = [
    fetchProductByTitleFunctionDeclaration,
    fetchProductsByTitlePartialMatchFunctionDeclaration,
    fetchProductsByKeywordsDeclaration
]