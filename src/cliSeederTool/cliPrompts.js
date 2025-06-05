import inquirer from "inquirer";
import { parseCsvToJson } from "./fileParseUtil.js";
import chalk from "chalk";
import { addProductsFromList } from "../services/productServices.js";

const FILE_ENTRY="file";
const MANUAL_ENTRY="manual";

process.on("SIGINT", () => {
    console.log("\n" + chalk.yellow("Exiting Program..."));
    process.exit(0);
});

// Run data seeding prompts.
export const dataSeeding = async () => {
    try {
        const seedMethod = await getSeedingMethod();
    
        if (seedMethod === MANUAL_ENTRY) {
            let continueManualEntry = false;
            do {
                const newProductData = await manualDataEntry();
                addProduct({...newProductData});

                continueManualEntry = askUserContinueManualInput();
            } while (continueManualEntry);
        } else if (seedMethod === FILE_ENTRY) {
            const filePath = await fileDataEntry()
            const dataToSeed = await (filePath ? parseCsvToJson(filePath) : parseCsvToJson());
            
            await addProductsFromList(dataToSeed);
            return;
        }
    } catch (error) {
        if (err && err.name === "ExitPromptError") {
            console.log(chalk.yellow("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;        
    }
}


export const deleteAllConfirm = async () => {
    const question = [{
        type: "confirm",
        name: "deleteConfirm",
        message: chalk.redBright("WARNING: Are you sure you want to delete all entries from database? This move cannot be undone")
    }];

    try {
        const answer = await inquirer.prompt(question);
        return answer.deleteConfirm;
    } catch (err) {
        if (err && err.name === "ExitPromptError") {
            console.log(chalk.yellow("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;
    }
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
    try {
        const answer = await inquirer.prompt(question);
        return answer.seedMethod;
    } catch (err) {
        if (err && err.name === "ExitPromptError") {
            console.log(chalk.yellow("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;
    }
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
                console.log(input)
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
    
    try {
        const answers = await inquirer.prompt(questions);
        return answers
    } catch (err) {
        if (err && err.name === "ExitPromptError") {
            console.log(chalk.yellow("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;
    }
}


// Prompt the user if they want to keep entering data manually.
async function askUserContinueManualInput() {
    const question = [{
        type: "confirm",
        name: "continueEntry",
        message: "Do you want to continue manual entry?"
    }];

    try {
        const answer = inquirer.prompt(question);
        return answer.continueEntry;
    } catch (error) {
        if (err && err.name === "ExitPromptError") {
            console.log(chalk.yellow("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;        
    }
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
    
    try {
        const answer = await inquirer.prompt(question);
        return answer.dataFilePath;
    } catch (err) {
        if (err && err.name === "ExitPromptError") {
            console.log(chalk.yellow("\nPrompt cancelled by user (Ctrl+C). Exiting cleanly."));
            process.exit(0);
        }
        throw err;
    }
}

