import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { format } from "timeago.js";

interface Props {
	DataArr: Array<{
		roomId: string;
		user: {
			id: string;
			username: string;
			firstname: string;
		};
		message: string;
		createdAt: string;
	}>;
}

const ChatMessages: FC<Props> = ({ DataArr }) => {
	const { user, room } = useContext(AuthContext) as any;

	return (
		<>
			{DataArr?.map((item, index) => {
				return (
					<Box flexDirection={"column"} w={"100%"} key={index} mb={2}>
						<Flex justifyContent={item.user.username === user.username ? "flex-end" : "flex-start"}>
							<Box>
								<Text pl={5} fontSize={"small"}>
									{item.user.firstname}
								</Text>
								<Box pl={5} pr={5} bg={item.user.username === user.username ? "#0084ff" : "gray"} borderRadius={"7px"}>
									<Box pt={1} pb={1} color={"white"}>
										{item.message}
									</Box>
								</Box>
								<Text fontSize={"smaller"} color={"gray.500"}>
									{format(new Date(item.createdAt), "en_US", { minInterval: 60 })}
								</Text>
							</Box>
						</Flex>
					</Box>
				);
			})}
			{/* <Box flexDirection={"column"} w={"100%"}>
				<Flex justifyContent={"flex-start"}>
					<Box>
						<Text pl={5} fontSize={"small"}>
							Brenda
						</Text>
						<Box pl={5} pr={5} bg={"gray"} borderRadius={"7px"}>
							<Box pt={1} pb={1}>
								Hola guapo!
							</Box>
						</Box>
						<Text fontSize={"smaller"} color={"gray.500"}>
							8 minutes ago
						</Text>
					</Box>
				</Flex>
			</Box>

			<Box flexDirection={"column"} w={"100%"}>
				<Flex justifyContent={"flex-end"}>
					<Box>
						<Text pl={5} fontSize={"small"}>
							Alexis
						</Text>
						<Box pl={5} pr={5} bg={"#0084ff"} borderRadius={"7px"}>
							<Box pt={1} pb={1} color={"white"}>
								Que dice moto mami?
							</Box>
						</Box>
						<Text fontSize={"smaller"} color={"gray.500"}>
							just now
						</Text>
					</Box>
				</Flex>
			</Box> */}
		</>
	);
};

export default ChatMessages;
