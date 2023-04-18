import express from "express";
import { getProducts, getRelatedProducts } from "../controllers/product.js";

const router = express.Router();

router.get("/get-products", getProducts);
router.get("/get-related-products", getRelatedProducts);

export default router;
