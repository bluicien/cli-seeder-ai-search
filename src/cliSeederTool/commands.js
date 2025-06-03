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
    .action(async () => {
        dataSeeding();
    });

program.parse(process.argv);