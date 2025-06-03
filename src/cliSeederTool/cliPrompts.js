import inquirer from "inquirer";

const FILE_ENTRY="file";
const MANUAL_ENTRY="manual";

export const dataSeeding = async () => {
    const seedingMethod = await getSeedingMethod();
    if (seedingMethod.seedMethod === MANUAL_ENTRY) {
        const newProductData = await manualDataEntry();

    }
}

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
        return answer;
    } catch (err) {
        console.error(err);
        
    }
}

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