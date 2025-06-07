import { GoogleGenAI, Type } from '@google/genai';
import dotenv from "dotenv";

import { getProductByTitle } from './productsServices.js';

dotenv.config();

// Configure the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Function declaration
const fetchProductByTitleFunctionDeclaration = {
    name: "fetchProductByTitle",
    description: "Searches for a 1 or more products by its title.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            title: {
                type: Type.STRING,
                description: "The title or name of the product"
            }
        },
        required: ["title"]
    }
}

const functionsToolKit = {
    fetchProductByTitle: ({title}) => {
        return getProductByTitle(title);
    }
}

export const searchWithGemini = async (searchPhrase) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: searchPhrase,
            config: {
                tools: [{
                    functionDeclarations: [fetchProductByTitleFunctionDeclaration]
                }],
            },
        });
    
        if (response.functionCalls && response.functionCalls.length > 0) {
            const functionCall = response.functionCalls[0];
            console.log(`Function to call: ${functionCall.name}`);
            console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);
            const functionCallResponse = await functionsToolKit[functionCall.name](functionCall.args);
            return functionCallResponse;
        } else {
            console.log("No function call found in your response");
            console.log(response.text);
        }
    } catch (err) {
        if (err && err.message) {
            console.error("Error in Gemini API Call.", err.message);
            
        }
    }
}    

