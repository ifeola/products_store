import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { MoonIcon, PlusSquare, SunIcon } from "lucide-react";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container w={"100%"}>
			<Container maxW={"920px"} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
					flexDir={{ base: "column", sm: "row" }}>
					<Link to={"/"}>
						<Text
							fontSize={{ base: "22", sm: "28" }}
							fontWeight={"bold"}
							textTransform={"uppercase"}
							textAlign={"center"}
							bgGradient="to-r"
							gradientFrom="cyan.400"
							gradientTo="blue.500"
							bgClip={"text"}>
							Product Store 🛒
						</Text>
					</Link>

					<HStack spacing={2} alignItems={"center"}>
						<Link to={"/create"}>
							<Button>
								<PlusSquare />
							</Button>
						</Link>
						<Button onClick={toggleColorMode}>
							{colorMode == "light" ? <SunIcon /> : <MoonIcon />}
						</Button>
					</HStack>
				</Flex>
			</Container>
		</Container>
	);
};
export default Navbar;
