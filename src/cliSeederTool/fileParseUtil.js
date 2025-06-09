// fileParseUtil.js

import csv from "csv-parser";
import fs from "fs";
import chalk from "chalk";

export const parseCsvToJson = async (filePath="src/data/data.json") => {
    const fileExt = getExtension(filePath); // Get file extension
    if (!fileExt)  // Handle if no file extension found.
        return;
    else if (fileExt === "json") { // Handle if JSON data file.
        const jsonFile = fs.readFileSync(filePath);
        const parsedJson = JSON.parse(jsonFile);
        console.info(chalk.green("JSON File Data Read"));
        return parsedJson;
    }
    else if (fileExt === "csv") { // Handle if CSV data file.
        return new Promise((res, rej) => {
            const fileData = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (data) => fileData.push(data))
                .on("end", () => {
                    console.log(chalk.green("File data parsed"));
                    res(fileData);
                })
                .on("error", (err) =>  {
                    console.error(err);
                    rej(err)
                });
        });
    }

    return;
}


// Extract file extension from file path.
function getExtension(filePath) {
    const fileExtDotIndex = filePath.lastIndexOf(".");
    if (fileExtDotIndex === -1) return "";
    return filePath.substring(fileExtDotIndex + 1);
}