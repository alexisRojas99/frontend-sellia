import React, { Fragment, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { getAllRooms } from "../../../services/rooms";
import SpinnerAnimation from "../../../components/animations/SpinnerAnimation";
import { AuthContext } from "../../../context/AuthContext";
import RoomsCard from "../../../components/home/RoomsCard/RoomsCard";
import { Box, Flex } from "@chakra-ui/react";

type Room = Array<{
	_id: string;
	name: string;
	description: string;
	status: boolean;
	createdAt: string;
}>;

const HomeUser = () => {
	const { user, room } = useContext(AuthContext);

	const { data, isLoading } = useQuery(["getAllRooms"], getAllRooms);
	const rooms: Room = data?.data;

	return (
		<Flex justifyContent={"center"} alignItems={"center"} height={"80vh"} mt={6}>
			<Flex justifyContent={"space-around"} flexWrap={"wrap"} gap={50} width={"50%"}>
				{isLoading ? (
					<SpinnerAnimation />
				) : (
					rooms.map((values, index) => {
						return (
							<Fragment key={index}>
								<RoomsCard {...values} />
							</Fragment>
						);
					})
				)}
			</Flex>
		</Flex>
	);
};

export default HomeUser;
