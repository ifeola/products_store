import express, { request } from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // Middleware to parse JSON bodies

// Get all products
app.get("/api/products", async (request, response) => {
	try {
		const products = await Product.find({});
		response.status(200).json({
			success: true,
			message: "All products fetched successfully",
			products: products,
		});
	} catch (error) {
		response.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
});

app.post("/api/products", (request, response) => {
	const product = request.body;
	// Here you would typically save the product to the database

	if (
		!product.name ||
		!product.price ||
		!product.description ||
		!product.imageUrl ||
		!product.category ||
		!product.stockQuantity
	) {
		return response
			.status(400)
			.json({ success: false, message: "Name and price are required" });
	}

	const newProduct = new Product(product);
	try {
		newProduct.save();
		response.status(201).json({
			success: true,
			message: "Product created successfully",
			product: newProduct,
		});
	} catch (error) {
		response.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
});

app.delete("/api/products/:id", async (request, response) => {
	const productId = request.params.id;
	try {
		await Product.findByIdAndDelete(productId);
		response.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		response.status(404).json({
			success: false,
			message: "Product not found",
			error: error.message,
		});
	}
});

app.get("/", (request, response) => {});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
