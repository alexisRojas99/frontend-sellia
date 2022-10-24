import { createContext, FC, ReactNode, useLayoutEffect, useState } from "react";
import { verifyToken } from "../services/auth/auth";
interface Context {
	setAuthToken: Function;
	setIsLoading: Function;
	isLoading: Boolean;
	authToken: null | String;
	user: null | Object;
	setUser: Function;
	room: null | Object | String;
	setRoom: Function;
}

export const AuthContext = createContext<Context>({
	setAuthToken: () => null,
	setIsLoading: () => null,
	authToken: null,
	isLoading: false,
	user: null,
	setUser: () => null,
	room: null,
	setRoom: () => null,
});

interface Props {
	children?: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [authToken, setAuthToken] = useState<String | null>(null);
	const [user, setUser] = useState<Object | null>(null);
	const [room, setRoom] = useState<Object | null | String>(null);

	const [token] = useState(localStorage.getItem("x-access-token"));

	useLayoutEffect(() => {
		if (token) {
			const auth = async () => {
				const response: any = await verifyToken();
				
				setUser(response.data);
				setIsLoading(false);
			};
			
			auth();
		} else {
			setIsLoading(false);
		}

		// setLocalAuthToken(token);
	}, [token]);

	return <AuthContext.Provider value={{ room, setRoom, isLoading, setAuthToken, setIsLoading, authToken, user, setUser }}>{children}</AuthContext.Provider>;
};
