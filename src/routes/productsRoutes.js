import { Router } from "express";
import { searchByPhrase } from "../controllers/productsController.js";

const router = Router();

router.get("/search-phrase", searchByPhrase);

export default router;