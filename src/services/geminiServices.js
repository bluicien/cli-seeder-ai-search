// geminiServices.js

import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";

import { functionsToolKit, productFunctions } from '../utils/functionDeclarations.js';

dotenv.config();


// Connect to Gemini API with key.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Configure Gemini API with the function declarations.
const config = {
    tools: [{
        functionDeclarations: productFunctions
    }],
};


/**
 * Takes a search phrase as argument, makes a call to Gemini AI API to determine the optimal DB search function and arguments to utilize. 
 * The function is then called from the functionsToolKit to query the database and return the list of products. If there are no function calls determined, 
 * the response from the AI on what was the issue is instead returned.
 * @param {string} searchPhrase 
 * @returns - Returns a list of products or message from Gemini AI on some improvements that can be made to search phrase.. 
 */
export const searchWithGemini = async (searchPhrase) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: searchPhrase,
            config: config,
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
            return response.text;
        }
    } catch (err) {
        console.error("Error in Gemini API Call.", err);
    }
}    

