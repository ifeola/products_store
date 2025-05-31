import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		imageUrl: "",
		category: "",
		stockQuantity: "",
	});

	const { createProduct } = useProductStore();
	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				type: "error",
				duration: 3000,
				closable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: message,
				type: "success",
				duration: 3000,
				closable: true,
			});
		}
		setNewProduct({
			name: "",
			description: "",
			price: "",
			imageUrl: "",
			category: "",
			stockQuantity: "",
		});
	};

	return (
		<Container w={"full"}>
			<Container maxW={"920px"}>
				<VStack spacing={8}>
					<Heading as={"h1"} size={"2xl"} textAlign={"center"} marginBottom={8}>
						Create New Product
					</Heading>

					<Box
						w={"full"}
						bg={useColorModeValue("white", "gray.900")}
						p={6}
						rounded={"lg"}
						shadow={"md"}>
						<VStack spacing={4}>
							<Input
								variant="outline"
								type="text"
								placeholder="Product Name"
								name="name"
								value={newProduct.name}
								onChange={(e) =>
									setNewProduct({ ...newProduct, name: e.target.value })
								}
							/>
							<Input
								variant="outline"
								type="text"
								placeholder="Product Description"
								name="description"
								value={newProduct.description}
								onChange={(e) =>
									setNewProduct({ ...newProduct, description: e.target.value })
								}
							/>
							<Input
								variant="outline"
								placeholder="Product Price"
								name="price"
								type="number"
								value={newProduct.price}
								onChange={(e) =>
									setNewProduct({ ...newProduct, price: e.target.value })
								}
							/>
							<Input
								variant="outline"
								type="text"
								placeholder="Product Image"
								name="imageUrl"
								value={newProduct.imageUrl}
								onChange={(e) =>
									setNewProduct({ ...newProduct, imageUrl: e.target.value })
								}
							/>
							<Input
								variant="outline"
								placeholder="Product Category"
								name="category"
								value={newProduct.category}
								onChange={(e) =>
									setNewProduct({ ...newProduct, category: e.target.value })
								}
							/>
							<Input
								variant="outline"
								placeholder="Product Quantity"
								name="stockQuantity"
								type="number"
								value={newProduct.stockQuantity}
								onChange={(e) =>
									setNewProduct({
										...newProduct,
										stockQuantity: e.target.value,
									})
								}
							/>
							<Button
								w={"full"}
								bgColor={"blue.500"}
								onClick={handleAddProduct}>
								Add Product
							</Button>
							<Toaster />
						</VStack>
					</Box>
				</VStack>
			</Container>
		</Container>
	);
};
export default CreatePage;
