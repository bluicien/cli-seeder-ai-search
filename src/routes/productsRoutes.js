import { Router } from "express";
import { allProducts, searchByPhrase } from "../controllers/productsController.js";

const router = Router();

router.get("/", allProducts)
router.get("/:title", searchByPhrase);
router.get("/search", searchByPhrase);

export default router;