import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loginAuth, verifyToken } from "../../services/auth/auth";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const { setAuthToken, setIsLoading, authToken, setUser } = useContext(AuthContext);
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	const onSubmit = async (data: any) => {
		setIsError(false);
		const login: any = await loginAuth(data);

		if (login.status !== 200) {
			setIsError(true);
			return;
		}

		const userData: any = await verifyToken();
		// console.log("userData", userData);
		setUser(userData.data);

		navigate("/", { replace: true });
	};

	return (
		<Box minHeight={{ base: "60vh", md: "80vh" }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<SimpleGrid columns={1} spacing={4} minWidth={{ base: "300px", sm: "300px", md: "310px" }}>
					<Box>
						<Heading>Log In</Heading>
					</Box>
					<Box>
						<FormControl isInvalid={isError}>
							<FormLabel htmlFor="email"></FormLabel>
							<Input id="username" placeholder="example@gmail.com" type={"email"} {...register("username", { required: true })} />
						</FormControl>
					</Box>
					<Box>
						<FormControl isInvalid={isError}>
							<FormLabel htmlFor="password"></FormLabel>
							<Input id="password" placeholder="password" type={"password"} {...register("password", { required: true })} />
						</FormControl>
					</Box>
					<Center>{isError && <Text color={"red"}>Wrong Username or Password</Text>}</Center>

					<Box>
						<Button colorScheme={"facebook"} minWidth={"full"} type="submit">
							Log In
						</Button>
					</Box>
				</SimpleGrid>
			</form>
		</Box>
	);
};

export default Login;
