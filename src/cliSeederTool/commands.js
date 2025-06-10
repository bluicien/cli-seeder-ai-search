#!/usr/bin/env node

// commands.js

import { program } from "commander";

import { dataSeedingManager, deleteAllConfirm } from "./cliPrompts.js";
import { getAllProducts, getProductById, deleteProductById, deleteAllProducts, addProduct, addProductsFromList } from "../services/productsServices.js";
import { connectMongoDB } from "../db/db.js";
import { warning, informationHeading, errorAlert, information, success } from "../utils/chalkSchema.js";
import { parseCsvToJson } from "./fileParseUtil.js";

program
    .version("1.0.0")
    .name("mongo-seeder")
    .description("CLI Data Seeding Tool");

program
    .command("seed-data")
    .alias("s")
    .description("Seed data to MongoDB. Run with no options to open CLI UI.")
    .option("-f, --file [file-path]", "Seed data from file")
    .option("-p, --product <product-details...>", "Seed data in order of arguments <title> <start-price> <reserve-price> [description]")
    .action(async (option) => {
        if (option.product) {
            // Handle manual product upload
            if (option.product.length < 3) {
                console.info(warning("Please at least 3 arguments. <title> <start-price> <reserve-price>"))
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
            console.log(success("New Product Added: "));
            console.log(newProduct);
        } 
        else if (option.file) {
            // Handle file upload
            let dataToSeed;
            if (option.file === true)
                dataToSeed = await parseCsvToJson();

            if (typeof option.file === "string")
                dataToSeed = await parseCsvToJson(option.file);
            
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
    .description("Get Single Product by _id.")
    .action(async (_id) => {
        // Get single product by _id
        console.log(await getProductById(_id));
        process.exit(0);
    });

program
    .command("all-products")
    .alias("ap")
    .description("Get all products.")
    .action(async () => {
        // Get all products.
        console.log(await getAllProducts());
        process.exit(0);
    });

program
    .command("delete-product <_id>")
    .alias("dp")
    .description("Delete single product by _id.")
    .action(async (_id) => {
        // Delete single product
        await deleteProductById(_id);
        process.exit(0);
    });

program
    .command("delete-all")
    .alias("da")
    .description("Delete all products from database.")
    .action(async () => {{
        // Delete all products.
        const deleteData = await deleteAllConfirm();
        if (deleteData === true)
            await deleteAllProducts();
        else 
            console.info(information("Deletion Cancelled."));
        
        process.exit(0);
    }})


    
async function main() {
    try {
        await connectMongoDB();
        console.log(informationHeading("Connected to MongoDB.\n")); 
        program.parse(process.argv);
    } catch (err) {
        console.error(errorAlert("Fatal error:", err));
        process.exit(1);
    }
}

main();