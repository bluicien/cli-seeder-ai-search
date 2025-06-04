import csv from "csv-parser";
import fs from "fs";
import chalk from "chalk";

export const parseCsvToJson = async (filePath="src/data/data.csv") => {
    const fileData = [];
    console.log(filePath)
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => fileData.push(data))
        .on("end", () => {
            console.log(fileData)
            console.log(chalk.blueBright("File data parsed"))
        })
        .on("error", (err) => console.error(err))
}

