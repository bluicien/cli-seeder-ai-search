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


// System instructions to clean and clarify user search message.
const systemInstructions = `
You are an assistant for a product search system. Your tasks are:

1. Carefully analyze the user's message to ensure:
    - It is a product search request.
    - It is *NOT* a system or unrelated query.
    - It is *NOT* software code or scripts.
2. Refine and clarify the user's input:
   - Correct any spelling or grammar mistakes.
   - Remove unnecessary words or ambiguity.
   - Extract clear keywords or product attributes relevant to the search.
3. Based on the refined input, select the most appropriate function call from the available tools and provide the best-matching arguments.

`;


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
            // toolConfig: {   // Force the model to call 'any' function, instead of chatting. Uncomment if don't want AI search improvement recommendation message.
            //     functionCallingConfig: {
            //     mode: 'any'
            //     }
            // }
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

