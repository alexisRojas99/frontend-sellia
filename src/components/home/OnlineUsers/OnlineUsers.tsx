import { Divider, List, ListIcon, ListItem } from "@chakra-ui/react";
import React, { FC, Fragment, useContext, useEffect } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../../context/AuthContext";

type DataArr = Array<{
	roomId: string;
	user: {
		id: string;
		username: string;
		firstname: string;
		lastname: string;
		is_suspended: boolean;
	};
}>;

interface Props {
	roomId: string;
	DataArr: DataArr;
}

const OnlineUsers: FC<Props> = ({ roomId, DataArr }) => {
	const { user, room } = useContext(AuthContext) as any;
	const [onlineUsers, setOnlineUsers] = React.useState<DataArr>([]);

	useEffect(() => {
		const myUser = DataArr.find((item) => item.user.id === user?.id);
		if (myUser) {
			setOnlineUsers([myUser, ...DataArr.filter((item) => item.user.id !== user?.id)]);
		}

	}, [DataArr]);

	return (
		<>
			<List spacing={3}>
				{onlineUsers?.map((item, index) => {
					return (
						<Fragment key={index}>
							{roomId === item.roomId && (
								<ListItem>
									<ListIcon as={CheckCircleIcon} color="green.500" />
									{item.user.firstname}
								</ListItem>
							)}
						</Fragment>
					);
				})}
			</List>
		</>
	);
};

export default OnlineUsers;
