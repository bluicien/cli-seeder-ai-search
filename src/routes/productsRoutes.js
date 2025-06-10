// productsRoutes.js

import { Router } from "express";
import { allProducts, searchByPhrase, productByTitle } from "../controllers/productsController.js";

const router = Router();

router.get("/", allProducts) // Retrieves all products.
router.get("/:title", productByTitle); // Retrieves a product by title match in params.
router.get("/search", searchByPhrase); // Query search. Retrieves products by user search phrase/keywords.

export default router;