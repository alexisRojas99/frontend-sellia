import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Flex, FormControl, Grid, GridItem, Icon, Input, Text, useMediaQuery } from "@chakra-ui/react";
import io from "socket.io-client";
// import { socketIO } from "../../../lib/socket-client/socket-client";
import ChatMessages from "../../../components/home/ChatMessages/ChatMessages";
import OnlineUsers from "../../../components/home/OnlineUsers/OnlineUsers";
import { useParams } from "react-router-dom";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useMutation, useQuery } from "react-query";
import { getRoomById } from "../../../services/rooms";
import SpinnerAnimation from "../../../components/animations/SpinnerAnimation";
import { createMessage, getAllMessages } from "../../../services/messages";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

interface Messages {
	roomId: string;
	user: {
		id: string;
		username: string;
		firstname: string;
	};
	message: string;
	createdAt: string;
}

const RoomView = () => {
	const { user, setRoom } = useContext(AuthContext) as any;
	const { id } = useParams<{ id: string }>();
	const [message, setMessage] = useState<string>("");
	const [chat, setChat] = useState<Array<any>>([]);
	const [onlineUsers, setOnlineUsers] = useState<Array<any>>([]);
	const [showEmoji, setShowEmoji] = useState<boolean>(false);

	const socketIO = io(import.meta.env.VITE_SOCKET_HOST || "http://localhost:8000", {
		auth: {
			token: localStorage.getItem("x-access-token"),
		},
		extraHeaders: {
			Room: id || "",
		},
		autoConnect: false,
		// transports: ["websocket", "polling"],
		multiplex: false,
	});

	const bottomRef = useRef(null) as any;

	const { data, isLoading, refetch } = useQuery("getRoomById", () => getRoomById(String(id)));

	const {
		data: dataMessages,
		isLoading: isLoadingMessages,
		refetch: refetchMessages,
	} = useQuery(["getAllMessages", String(id)], ({ queryKey }) => getAllMessages({ id_room: queryKey[1] }));

	const { mutate } = useMutation((data: { id_user: string; id_room: string; message: string }) => {
		return createMessage(data);
	});

	const handleOnClick = () => {
		if (!message) return;
		mutate({
			id_user: user?.id,
			id_room: id || "",
			message: message,
		});
		setMessage("");
	};

	useEffect(() => {
		setChat(dataMessages?.data);
	}, [dataMessages]);

	useEffect(() => {
		refetch();
		refetchMessages();
		setRoom(id);
		socketIO.connect();
		socketIO.emit("join-room", {
			roomId: id,
			user: user,
		});

		socketIO.on("join-room", (data) => {
			setOnlineUsers(data);
		});

		socketIO.on("new-message", (data) => {
			setChat((prev) => [...prev, data]);
		});

		return () => {
			socketIO.off("join-room");
			socketIO.off("new-message");
		};
	}, []);

	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		bottomRef.current?.scrollIntoView({
			botoom: 0,
			behavior: "smooth",
		});
	}, [chat]);

	const handleEmojiClick = (event: any, emojiObject: { emoji: string }) => {
		let newMessage = message + emojiObject.emoji;

		setMessage(newMessage);
		setShowEmoji(false);
	};

	const [isLarge] = useMediaQuery("(min-width: 1300px)");
	const [isMiddle] = useMediaQuery("(min-width: 800px)");

	return (
		<Flex justifyContent={"center"} mt={isMiddle ? "80px" : "20px"} mb={"10px"}>
			<Box width={isMiddle ? "70%" : "95%"} height={"100%"}>
				{isLoadingMessages ? (
					<SpinnerAnimation />
				) : (
					<Grid
						h={isMiddle ? "700px" : "70%"}
						templateRows="repeat(2, 1fr)"
						templateColumns={isLarge ? "repeat(5, 1fr)" : "repeat(4, 1fr)"}
						border={"1px solid gray"}
						flexWrap={"wrap"}
					>
						{isLarge ? (
							<GridItem rowSpan={2} colSpan={1} bg="transparent" borderRight={"1px solid gray"}>
								<Box padding={5}>
									<Input placeholder="Search" backgroundColor={"whiteAlpha.200"} />
								</Box>

								<Box padding={5}>Online</Box>
								<Box ml={5} mr={5}>
									<OnlineUsers roomId={String(id)} DataArr={onlineUsers} />
								</Box>
							</GridItem>
						) : (
							<></>
						)}

						<GridItem colSpan={4} rowSpan={4} bg="transparent">
							<Text padding={5} fontSize={"2xl"} fontWeight={"semibold"}>
								{data?.data.name}
							</Text>
							<Divider borderColor={"gray"} />
							<Box padding={5} h={isMiddle ? "540px" : "450px"}>
								<Box pl={isMiddle ? 8 : 2} pr={isMiddle ? 8 : 2} h={"100%"} w={"100%"} overflow={"auto"} flexDirection={"row"} id={"chat-container"}>
									<ChatMessages DataArr={chat} />
									<Box ref={bottomRef} />
								</Box>
							</Box>

							<Divider borderColor={"gray"} mb={5} />
							<Flex ml={5} mr={5} justifyContent={"center"} gap={3} height={"50px"}>
								<Flex alignItems={"center"} _hover={{ cursor: "pointer" }} onClick={() => setShowEmoji(!showEmoji)} position={"relative"}>
									{showEmoji && (
										<Box position={"absolute"} bottom={0} mb={"60px"}>
											<EmojiPicker disableSearchBar pickerStyle={{ boxShadow: "none" }} onEmojiClick={handleEmojiClick} />
										</Box>
									)}
									<Icon as={HiOutlineEmojiHappy} fontSize={"3xl"} mb={"10px"} />
								</Flex>
								<Input
									placeholder={"Write a message..."}
									backgroundColor={"whiteAlpha.200"}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										setMessage(e.currentTarget.value);
									}}
									value={message}
									onKeyUp={(e) => {
										if (e.key === "Enter") {
											handleOnClick();
										}
									}}
								/>
								<Button backgroundColor={"transparent"} onClick={() => handleOnClick()}>
									<Icon textColor={"#0084ff"} rotate={"45deg"} as={FaTelegramPlane} fontSize={"3xl"} color={"white"} />
								</Button>
							</Flex>
						</GridItem>
					</Grid>
				)}
			</Box>
		</Flex>
	);
};

export default RoomView;
