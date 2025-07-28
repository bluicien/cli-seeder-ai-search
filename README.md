# Mission 5 Phase 1 - CLI Seeder & AI Product Search Tool

This project is a Node.js application that provides both a CLI tool for seeding product data into MongoDB and an Express API server for querying products with AI-powered search capabilities. It features a user-friendly command-line interface, supports manual and file-based data entry, and integrates with Google Gemini AI for advanced product search.

---

## Table of Contents

- [Mission 5 Phase 1 - CLI Seeder \& AI Product Search Tool](#mission-5-phase-1---cli-seeder--ai-product-search-tool)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [CLI Usage](#cli-usage)
    - [API Usage](#api-usage)
  - [Configuration](#configuration)
  - [Project Structure](#project-structure)
  - [Requirements](#requirements)
  - [Development](#development)
  - [License](#license)
  - [Author](#author)

---

## Features

- **CLI Data Seeder:**  
  - Seed product data into MongoDB via interactive CLI prompts or CSV/JSON files
  - Manual and file-based data entry with validation
  - Add, import, and delete products via command-line arguments
  - Colorful CLI output for better user experience

- **REST API Server:**  
  - Retrieve all products from the database
  - Search products by title or keyword
  - AI-powered search using Google Gemini API

- **AI Integration:**  
  - Google Gemini AI integration for intelligent product search
  - AI interprets user queries and selects optimal search strategies
  - Advanced natural language processing for product discovery

- **Technical Features:**  
  - Data validation and comprehensive error handling
  - Modular code structure for easy maintenance
  - MongoDB integration with Mongoose ODM
  - Environment-based configuration

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd mission-5-phase-1-individual-bluicien
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGO_CONNECTION_STRING=your_mongodb_connection_string
   MONGO_DB_NAME=your_database_name
   ```

4. **Link CLI Package (Optional):**
   ```bash
   npm link
   ```
   This creates a global symbolic link to simplify CLI calls. After linking, you can run `mongo-seeder` instead of `npx mongo-seeder`.

5. **Start the API server:**
   ```bash
   npm start
   ```
   The server runs on the port specified in `.env` (default: 3000).

---

## Usage

### CLI Usage

The CLI tool is available as `mongo-seeder`:

- **Seed data interactively:**
  ```bash
  npx mongo-seeder seed-data
  ```
- **Seed data from a file:**
  ```bash
  npx mongo-seeder seed-data --file src/data/data.csv
  ```
- **Add a product directly:**
  ```bash
  npx mongo-seeder seed-data --product "Title" "Description" 10.99 20.00
  ```
- **List all products:**
  ```bash
  npx mongo-seeder all-products
  ```
- **Delete a product by ID:**
  ```bash
  npx mongo-seeder delete-product <_id>
  ```
- **Delete all products:**
  ```bash
  npx mongo-seeder delete-all
  ```

### API Usage

**Base URL:** `http://localhost:3000`

- **GET /api/products**  
  Get all products from the database.

- **GET /api/products/title/:title**  
  Get products by exact title match.

- **GET /api/products/search?keywords=...**  
  AI-powered search using keywords or natural language phrases.

---

## Configuration

The application requires the following environment variables in your `.env` file:

- `PORT` - Server port (default: 3000)
- `GEMINI_API_KEY` - Your Google Gemini API key for AI search functionality
- `MONGO_CONNECTION_STRING` - MongoDB connection string
- `MONGO_DB_NAME` - Name of your MongoDB database

---

## Project Structure

```
src/
  server.js                # Express server entry point
  cliSeederTool/           # CLI tool logic and commands
  config/                  # Configuration (dotenv)
  controllers/             # API controllers
  data/                    # Example data files (CSV, JSON)
  db/                      # MongoDB connection
  models/                  # Mongoose schemas
  routes/                  # Express routes
  services/                # Business logic and AI integration
  utils/                   # Utility functions and CLI styling
```

---

## Requirements

- Node.js v18+
- MongoDB (local or remote)
- Google Gemini API key for AI search functionality

---

## Development

- Use `npm run dev` for development with live-reloading
- Use `npm start` to run the production server
- The CLI tool can be tested with `npx mongo-seeder --help`
- Lint and format code as needed
- Add your own features or extend the CLI as required

---

## License

ISC

---

## Author

Brendon
