import { Router } from "express";
import { searchKeyword } from "../controllers/productsController.js";

const router = Router();

router.get("/search-keywords", searchKeyword);

export default router;