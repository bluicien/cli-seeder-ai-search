import { GoogleGenAI, Type } from '@google/genai';
import dotenv, { config } from "dotenv";

import { functionsToolKit, productFunctions } from '../utils/functionDeclarations';


dotenv.config();

// Configure the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const config = {
    tools: [{
        functionDeclarations: productFunctions
    }],
};


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
        }
    } catch (err) {
        if (err && err.message) {
            console.error("Error in Gemini API Call.", err.message);
        }
    }
}    

