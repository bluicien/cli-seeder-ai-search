// geminiServices.js

import { GoogleGenAI } from '@google/genai';

import { functionsToolKit, productFunctions } from '../utils/functionDeclarations.js';
import config from '../config/config.js';
import { errorAlert, information, informationHeading } from '../utils/chalkSchema.js';


// Connect to Gemini API with key.
const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

// Configure Gemini API with the function declarations.
const geminiConfig = {
    tools: [{
        functionDeclarations: productFunctions
    }],
};

const systemInstructions = `Interpret the user message
1. Ensure that the user message is related to searching for products and not something unrelated or regarding system function
2. Clear user input to make sure spelling and grammar is correct.
3. If user has entered a vague search message, interpret and use closest function call from tools with arguments closest to what user wants.
`


/**
 * Takes a search phrase as argument, makes a call to Gemini AI API to determine the optimal DB search function and arguments to utilize. 
 * The function is then called from the functionsToolKit to query the database and return the list of products. If there are no function calls determined, 
 * the response from the AI on what was the issue is instead returned.
 * @param {string} searchPhrase 
 * @returns - Returns a list of products or message from Gemini AI on some improvements that can be made to search phrase.. 
 */
export const searchWithGemini = async (searchPhrase) => {

    const contents = [
        {
            role: 'user',
            parts: [{ text: systemInstructions }]
        },
        {
            role: 'user',
            parts: [{ text: searchPhrase }]
        }
    ];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
            config: geminiConfig,
        });
    
        if (response.functionCalls && response.functionCalls.length > 0) {
            const functionCall = response.functionCalls[0];
            console.log(information(`Function to call: ${informationHeading(functionCall.name)}`));
            console.log(information(`Arguments: ${informationHeading(JSON.stringify(functionCall.args))}`));
            const functionCallResponse = await functionsToolKit[functionCall.name](functionCall.args);
            return functionCallResponse;
        } else {
            console.log(information("No function call found in your response"));
            console.log(response.text);
            return response.text;
        }
    } catch (err) {
        console.error(errorAlert("Error in Gemini API Call.", err));
    }
}    

