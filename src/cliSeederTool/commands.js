#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

import { dataSeedingManager, deleteAllConfirm } from "./cliPrompts.js";
import { getAllProducts, getProductById, deleteProductById, deleteAllProducts, addProduct } from "../services/productsServices.js";
import { connectMongoDB } from "../db/db.js";

program
    .version("1.0.0")
    .name("mongo-seeder")
    .description("CLI Data Seeding Tool");

program
    .command("seed-data")
    .alias("s")
    .description("Seed data to MongoDB.\nRun with no options to open CLI UI.\n")
    .option("-f, --file <file-path>", "Seed data from file")
    .option("-p, --product <product-details...>", "Seed data in order of arguments <title> <start-price> <reserve-price> [description]")
    .action(async (option) => {
        if (option.product) {
            // Handle manual product upload
            if (option.product.length < 3) {
                console.info(chalk.red("Please at least 3 arguments. <title> <start-price> <reserve-price>"))
                process.exit(1);
            }

            const [ title, arg2, arg3, arg4 ] = option.product;
            let description, startPrice, reservePrice;

            if (option.product.length === 3) {
                description = "";
                startPrice = arg2;
                reservePrice = arg3;
            } else {
                description = arg2
                startPrice = arg3;
                reservePrice = arg4;
            }

            const newProduct = await addProduct(title, description, startPrice, reservePrice);
            console.log(chalk.green("New Product Added: "));
            console.log(newProduct);
        } 
        else if (option.file) {
            // Handle file upload
            const dataToSeed = await (option.file ? parseCsvToJson(option.file) : parseCsvToJson());
            
            await addProductsFromList(dataToSeed);
        }
        else if (Object.keys(option).length <= 0) {
            // If no options passed in, run CLI UI.
            await dataSeedingManager();
        }
        process.exit(0);
    });

program
    .command("get-product <_id>")
    .alias("gp")
    .description("Get Single Product by _id.\n")
    .action(async (_id) => {
        // Get single product by _id
        console.log(await getProductById(_id));
        process.exit(0);
    });

program
    .command("all-products")
    .alias("ap")
    .description("Get all products.\n")
    .action(async () => {
        // Get all products.
        console.log(await getAllProducts());
        process.exit(0);
    });

program
    .command("delete-product <_id>")
    .alias("dp")
    .description("Delete single product by _id.\n")
    .action(async (_id) => {
        // Delete single product
        await deleteProductById(_id);
        process.exit(0);
    });

program
    .command("delete-all")
    .alias("da")
    .description("Delete all products from database.\n")
    .action(async () => {{
        // Delete all products.
        const deleteData = await deleteAllConfirm();
        if (deleteData === true)
            await deleteAllProducts();
        else 
            console.info(chalk.greenBright("Deletion Cancelled."));
        
        process.exit(0);
    }})


    
async function main() {
    try {
        await connectMongoDB();
        console.log(chalk.green.bold("Connected to MongoDB.\n")); 
        program.parse(process.argv);
    } catch (err) {
        console.error(chalk.red("Fatal error:"), err);
        process.exit(1);
    }
}

main();