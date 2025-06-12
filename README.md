# Mission 5 Phase 1

This project provides:
- **A CLI tool** for seeding and managing product data in a MongoDB database.
- **An ExpressJS API server** for querying product data, including AI-powered search using Google Gemini.

---

## Features

- **CLI Data Seeder:**  
  Add, import, and delete products in MongoDB via an interactive CLI or command-line arguments.
- **REST API:**  
  Retrieve all products, search by title, or use AI-powered keyword search.
- **AI Search:**  
  Integrates Google Gemini to interpret user queries and select the best search strategy.

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
   Create an `.env` with the following variables `PORT, GEMINI_API_KEY, MONGO_CONNECTION_STRING, MONGO_DB_NAME`.

4. **Link CLI Package**
   ```bash
   npm link
   ```
   Create symbolic link globally to simplift CLI calls. This will allow you to run `mongo-seeder` instead of `npx mongo-seeder`.

5. **Start the API server:**
   ```bash
   npm start
   ```
   The server runs on the port specified in `.env` (default: 4000).

---

## CLI Usage

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

---

## API Endpoints

- `GET /api/products`  
  Get all products.

- `GET /api/products/title/:title`  
  Get products by exact title.

- `GET /api/products/search?keywords=...`  
  AI-powered search by keywords or phrases.

---

## Project Structure

```
src/
  server.js                # Express server entry point
  cliSeederTool/           # CLI tool logic
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
- Google Gemini API key

---

## License

ISC

---

## Author

Brendon
