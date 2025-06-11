// productsRoutes.js

import { Router } from "express";
import { allProducts, searchByPhrase, productByTitle } from "../controllers/productsController.js";

const router = Router();

router.get("/", allProducts) // Retrieves all products.
router.get("/search", searchByPhrase); // Query search. Retrieves products by user search phrase/keywords.
router.get("/title/:title", productByTitle); // Retrieves a product by title match in params.

export default router;