import { Box, Spinner } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
	StylesObj?: {
		[key: string]: string;
	};
}

const SpinnerAnimation: FC<Props> = ({ StylesObj }) => {
	return (
		<Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight="100vh" {...StylesObj}>
			<Spinner
				thickness="5px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				css={"height: 65px; width: 65px;"}
				// size={'xl'}
			/>
		</Box>
	);
};

export default SpinnerAnimation;
