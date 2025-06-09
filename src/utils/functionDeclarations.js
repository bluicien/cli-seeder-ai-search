// functionDeclarations.js
import { Type } from "@google/genai";
import { getProductByTitle, getProductByTitlePartialMatch, getProductsByKeywords } from "../services/productsServices.js";

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


export const functionsToolKit = {
    fetchProductByTitle: ({ title }) => getProductByTitle(title),
    fetchProductByTitlePartialMatch: ({ title }) => getProductByTitlePartialMatch(title),
    fetchProductsByKeywords: ({ arrayOfKeywords }) => getProductsByKeywords(arrayOfKeywords),
};


export const productFunctions = [
    fetchProductByTitleFunctionDeclaration,
    fetchProductsByTitlePartialMatchFunctionDeclaration,
    fetchProductsByKeywordsDeclaration
]