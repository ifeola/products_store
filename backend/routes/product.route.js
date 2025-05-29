import express from "express";

import {
	deleteProduct,
	getProduct,
	createProduct,
	updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

// Get all products
router.get("/", getProduct);

// POST a product
router.post("/", createProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

// UPDATE a product
router.put("/:id", updateProduct);

export default router;
