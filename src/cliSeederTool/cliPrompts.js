import inquirer from "inquirer";

const FILE_ENTRY="file";
const MANUAL_ENTRY="manual";


// Run data seeding prompts.
export const dataSeeding = async () => {
    const seedMethod = await getSeedingMethod();

    if (seedMethod === MANUAL_ENTRY) {
        let continueManualEntry = false;
        do {
            const newProductData = await manualDataEntry();
            console.log(newProductData);
            continueManualEntry = askUserContinueManualInput();
        } while (continueManualEntry);
    } else if (seedMethod === FILE_ENTRY) {
        fileDataEntry()
    }
}


// Prompt user for how they want to seed data.
async function getSeedingMethod() {
    try {
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
        const answer = await inquirer.prompt(question);
        return answer.seedMethod;
    } catch (err) {
        console.error(err);
        
    }
}


// Prompt user with questions for data to new product.
async function manualDataEntry() {
    try {
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

        const answers = await inquirer.prompt(questions);
        return answers
    } catch (err) {
        console.error(err);
    }
}


// Prompt the user if they want to keep entering data manually.
async function askUserContinueManualInput() {
    const question = [{
        type: "confirm",
        name: "continueEntry",
        message: "Do you want to continue manual entry?"
    }];
    const answer = inquirer.prompt(question);
    return answer.continueEntry;
}


// Prompt user if they want to upload via csv/json file.
async function fileDataEntry() {
    try {
        const question = [
            {
                type: "input",
                name: "dataFilePath",
                message: "Please enter the path to you file data (CSV/JSON): ",
                validate: (input) => {
                    if (typeof input === "string" && !input.trim())
                            return "File path must not be empty. Please enter path to your file."
                    return true;
                }
            }
        ];

        const answer = await inquirer.prompt(question);
        return answer.dataFilePath;
    } catch (err) {
        console.log(err);
    }
}