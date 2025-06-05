import { Router } from "express";
import { searchKeyword } from "../controllers/productsController";

const router = Router();

router.get("/search-keywords", searchKeyword);

export default router;