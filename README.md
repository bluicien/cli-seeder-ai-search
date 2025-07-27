# CLI Seeder & AI Product Search Tool

This project is a Node.js CLI application for seeding product data into a MongoDB database and searching products using both traditional and AI-powered methods. It features a user-friendly command-line interface, supports manual and file-based data entry, and integrates with Gemini AI for advanced product search.

---

## Table of Contents

- [CLI Seeder \& AI Product Search Tool](#cli-seeder--ai-product-search-tool)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Seeding Data](#seeding-data)
    - [Searching Products](#searching-products)
    - [CLI Options](#cli-options)
  - [Configuration](#configuration)
  - [Project Structure](#project-structure)
  - [Development](#development)
  - [License](#license)

---

## Features

- Seed product data into MongoDB via CLI prompts or CSV/JSON files
- Manual and file-based data entry
- Product search by keyword, phrase, or AI (Gemini API)
- Data validation and error handling
- Colorful CLI output for better UX
- Modular code structure for easy maintenance

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd mission-5-phase-1-individual-bluicien
npm install
```

---

## Usage

Start the CLI tool:

```bash
npm start
# or
node src/cliSeederTool/commands.js
```

### Seeding Data

You can seed data manually or from a file:

- **Manual Entry:**
  ```bash
  mongo-seeder seed-data
  ```
  Follow the prompts to enter product details.

- **File Entry:**
  ```bash
  mongo-seeder seed-data -f path/to/data.csv
  ```
  Supports CSV and JSON files.

### Searching Products

You can search for products by keyword or phrase:

```bash
mongo-seeder search --phrase "wireless keyboard"
```

Or use the AI-powered search (if configured):

```bash
mongo-seeder search --ai "gaming laptop with RGB"
```

### CLI Options

- `-f, --file [file-path]`  Seed data from a file (optional argument)
- `-p, --product <details...>`  Seed data by providing product details directly
- `--phrase <search>`  Search products by phrase
- `--ai <search>`  Use Gemini AI to search products
- `-h, --help`  Show help menu

---

## Configuration

Set up your environment variables in a `.env` file:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/trademeDB
GEMINI_API_KEY=your-gemini-api-key
```

---

## Project Structure

```
src/
  server.js                # Express server (if used)
  cliSeederTool/
    commands.js            # Main CLI entry point
    cliPrompts.js          # Inquirer prompts
    fileParseUtil.js       # File parsing utilities
  db/
    db.js                  # MongoDB connection logic
  models/
    product.js             # Mongoose product schema
  services/
    productServices.js     # Product CRUD and search logic
  data/
    data.csv               # Example CSV data
    data.json              # Example JSON data
tests/                     # Test files
README.md
package.json
MISSION.md
```

---

## Development

- Use `npm run dev` or `nodemon` for live-reloading during development.
- Lint and format code as needed.
- Add your own features or extend the CLI as required.

---

## License

MIT License. See [LICENSE](LICENSE) for details.
