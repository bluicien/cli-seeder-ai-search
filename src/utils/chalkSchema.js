import chalk from "chalk";


// Warnings (e.g., validation issues, non-fatal problems)
export const warning = chalk.hex('#FFA500'); //

// Danger alert (e.g. confirmation when user wants to perform a dangerous action like deletion)
export const dangerAlert = chalk.redBright;

// Errors (e.g., failed operations, exceptions)
export const errorAlert = (message = "", err) => chalk.red(`${message} ${err?.stack ?? ""}`);

// Success (e.g., successful creation, update, deletion)
export const success = chalk.greenBright;

// Information headings (e.g., section titles, important info)
export const informationHeading = chalk.greenBright.bold.underline;

// General information (e.g., status updates, normal output)
export const information = chalk.blueBright;

// Prompts (e.g., user input requests)
export const prompting = chalk.magenta;

// Debug (optional, for verbose/debug output)
export const debug = chalk.gray;

// Exiting information. W
export const exitInfo = chalk.yellow;