import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (
			!newProduct.name ||
			!newProduct.price ||
			!newProduct.description ||
			!newProduct.imageUrl ||
			!newProduct.category ||
			!newProduct.stockQuantity
		) {
			return { success: false, message: "Please fill in all fields" };
		}

		const response = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		console.log(response);

		const data = await response.json();
		set((state) => ({ products: [...state.products, data.product] }));
		return { success: true, message: "Product Successfully added" };
	},
}));
