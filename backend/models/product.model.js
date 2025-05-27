import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		stockQuantity: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
// This code defines a Mongoose schema and model for a product in an e-commerce application.
// The schema includes fields for the product's name, description, price, image URL, category, and stock quantity.
// It also enables automatic management of createdAt and updatedAt timestamps.
// The model is then exported for use in other parts of the application, allowing for CRUD operations on product documents in the MongoDB database.
