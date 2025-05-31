import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (request, response) => {
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
};

export const createProduct = async (request, response) => {
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
		await newProduct.save();
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
};

export const deleteProduct = async (request, response) => {
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
};

export const updateProduct = async (request, response) => {
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
};
