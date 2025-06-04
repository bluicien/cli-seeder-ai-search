#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { dataSeeding } from "./cliPrompts.js";

program
    .version("1.0.0")
    .name("mongodb-seeder")
    .description("CLI Data Seeding Tool");

program
    .command("seed-data")
    .alias("s")
    .description("Seed data to MongoDB.\nRun with no options to open CLI UI.\n")
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

program
    .command("get-product <_id>")
    .alias("gp")
    .description("Get Single Product by _id.\n")
    .action(async () => {
        // Get single product by _id
    });

program
    .command("all-products")
    .alias("ap")
    .description("Get all products.\n")
    .action(async () => {
        // Get all products.
    });

program
    .command("delete-product <_id>")
    .alias("dp")
    .description("Delete single product by _id.\n")
    .action(async () => {
        // Delete single product
    });

program
    .command("delete-all")
    .alias("da")
    .description("Delete all products from database.\n")
    .action(async () => {{
        // Delete all products.
    }})


program.parse(process.argv);