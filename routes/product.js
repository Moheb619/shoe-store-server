import express from "express";
import { getProducts, getRelatedProducts, getCategorizedProducts } from "../controllers/product.js";

const router = express.Router();

router.get("/get-products", getProducts);
router.get("/get-related-products", getRelatedProducts);
router.get("/get-categorized-products/:category_slug", getCategorizedProducts);

export default router;
