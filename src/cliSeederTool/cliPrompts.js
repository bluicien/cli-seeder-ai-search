// cliPrompts.js

import inquirer from "inquirer";
import { parseCsvToJson } from "./fileParseUtil.js";
import { addProduct, addProductsFromList } from "../services/productsServices.js";
import { dangerAlert, exitInfo, information, prompting } from "../utils/chalkSchema.js";

const FILE_ENTRY="file";
const MANUAL_ENTRY="manual";

process.on("SIGINT", () => {
    console.log("\n" + exitInfo("Exiting Program..."));
    process.exit(0);
});

// Run data seeding prompts.
export const dataSeedingManager = async () => {
    try {
        const seedMethod = await getSeedingMethod();
    
        if (seedMethod === MANUAL_ENTRY) {

            
            let continueManualEntry = false;
            do {
                console.info(information("===== MANUAL ENTRY ====="));
                const newProductData = await manualDataEntry();
                const { title, description, startPrice, reservePrice } = newProductData;
                await addProduct( title, description, startPrice, reservePrice );

                continueManualEntry = await askUserContinueManualInput();

            } while (continueManualEntry);

            return;

        } else if (seedMethod === FILE_ENTRY) {

            console.info(information("===== FILE ENTRY ====="));
            
            const filePath = await fileDataEntry()
            const dataToSeed = await (filePath ? parseCsvToJson(filePath) : parseCsvToJson());
            
            await addProductsFromList(dataToSeed);
            
            return;
        }
    } catch (err) {
        if (err && err.name === "ExitPromptError") {
            console.log(exitInfo("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;        
    }
}


export const deleteAllConfirm = async () => {
    const question = [{
        type: "confirm",
        name: "deleteConfirm",
        message: dangerAlert("WARNING: Are you sure you want to delete all entries from database? This move cannot be undone")
    }];

    const answer = await promptWithErrorHandling(question);
    return answer.deleteConfirm;
}


// Prompt user for how they want to seed data.
async function getSeedingMethod() {
    const question = [{
        type: "list",
        name: "seedMethod",
        message: "How would you like to seed the data?",
        choices: [
            {
                name: "Seed Data by File",
                value: FILE_ENTRY
            },
            {
                name: "Manual Data Entry",
                value: MANUAL_ENTRY
            }
        ]
    }];

    const answer = await promptWithErrorHandling(question);
    return answer.seedMethod;
}


// Prompt user with questions for data to new product.
async function manualDataEntry() {
    const questions = [
        {
            type: "input",
            name: "title",
            message: "What is the title?",
        },
        {
            type: "input",
            name: "description",
            message: "What is the description?"
        },
        {
            type: "input",
            name: "startPrice",
            message: "What is the start price?",
            validate: (input) => {
                if (isNaN(input)) 
                    return "Price must be a number.";
                return true;
            }
        },
        {
            type: "input",
            name: "reservePrice",
            message: "What is the reserve rice?",
            validate: (input) => {
                if (isNaN(input)) 
                    return "Price must be a number.";
                return true;
            }
        },
    ];

    const answers = await promptWithErrorHandling(questions);
    return answers;
}


// Prompt the user if they want to keep entering data manually.
async function askUserContinueManualInput() {
    const question = [{
        type: "confirm",
        name: "continueEntry",
        message: "Do you want to continue manual entry?"
    }];

    const answer = await promptWithErrorHandling(question);
    return answer.continueEntry;
}


// Prompt user if they want to upload via csv/json file.
async function fileDataEntry() {
    const question = [
        {
            type: "input",
            name: "dataFilePath",
            message: "Please enter the path to you file data (CSV/JSON): "
        }
    ];

    const answer = await promptWithErrorHandling(question);
    return answer.dataFilePath;
}


async function promptWithErrorHandling(questions) {
    try {
        const questionsWithChalk = questions?.map(question => ({...question, message: prompting(question.message)}));
        const answer = await inquirer.prompt(questionsWithChalk);
        return answer;
    } catch (err) {
        if (err?.name === "ExitPromptError") {
            console.log(exitInfo("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;        
    }
}