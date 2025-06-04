#!/usr/bin/env node

import { program } from "commander";
import { dataSeeding } from "./cliPrompts.js";

program
    .version("1.0.0")
    .name("mongodb-seeder")
    .description("CLI Data Seeding Tool");

program
    .command("seed-data")
    .alias("s")
    .description("----------------------------------------\nSeed data to MongoDB.\nRun with no options to open CLI UI.\n----------------------------------------")
    .option("-f, --file <file-path>", "Seed data from file")
    .option("-p, --product <product-details...>", "Seed data in order of arguments <title> <description> <start-price> <reserve-price>")
    .action(async (option) => {
        if (option.product) {
            // Handle manual product upload
        } 
        else if (option.file) {
            // Handle file upload
        }
        else if (Object.keys(option).length <= 0) {
            // If no options passed in, run CLI UI.
            dataSeeding();
        }
    });

program.parse(process.argv);