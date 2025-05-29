import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

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

app.post("/api/products", async (request, response) => {
	const product = await request.body;
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

app.put("/api/products/:id", async (request, response) => {
	const productID = request.params.id;
	const product = request.body;
	console.log(product);

	if (!mongoose.Types.ObjectId.isValid(productID))
		return response
			.status(404)
			.json({ success: false, message: "Product not found" });

	try {
		const updatedProducts = await Product.findByIdAndUpdate(
			productID,
			product,
			{
				new: true,
			}
		);
		response.status(200).json({
			success: true,
			message: "Product successfully updated",
			data: updatedProducts,
		});
	} catch (error) {
		response.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}

	// const product = await Product.findByIdAndUpdate(productID);
	// product.name = "Newly Updated Product";
	// Product.save();
});

app.get("/", (request, response) => {});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
