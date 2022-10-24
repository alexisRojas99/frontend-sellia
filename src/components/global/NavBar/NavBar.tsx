import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Input,
	useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useContext, useRef } from "react";
import { Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

interface Props {
	options?: any;
}

const NavBar: FC<Props> = ({ options }) => {
	const { setUser } = useContext(AuthContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<any>();

	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem("x-access-token");
		setUser(null);
		navigate("/", { replace: true });
	};

	return (
		<>
			<Flex
				backgroundColor={"#1a202c"}
				borderBottom={"1px solid gray"}
				height={"70px"}
				width={"100%"}
				justifyContent={"flex-end"}
				p={2}
				gap={5}
				position={"sticky"}
				top={0}
				zIndex={3}
			>
				<Flex justifyContent={"center"} alignItems={"center"}>
					<NavLink to={"/"}>
						<Text fontSize={"large"} fontWeight={"semibold"}>
							Home
						</Text>
					</NavLink>
				</Flex>
				<Flex justifyContent={"flex-end"} alignItems={"center"} _hover={{ cursor: "pointer" }} width={"10%"}>
					<Button backgroundColor={"red.500"} mr={5} onClick={() => handleLogOut()}>
						Log out
					</Button>
				</Flex>
				{/* <Flex justifyContent={"flex-end"}>
					<Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
						Open
					</Button>
					<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>Create your account</DrawerHeader>

							<DrawerBody>
								<Input placeholder="Type here..." />
							</DrawerBody>

							<DrawerFooter>
								<Button variant="outline" mr={3} onClick={onClose}>
									Cancel
								</Button>
								<Button colorScheme="blue">Save</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Flex> */}
			</Flex>
		</>
	);
};

export default NavBar;
