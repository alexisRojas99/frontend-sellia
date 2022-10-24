import { Navigate, Outlet } from "react-router-dom";
import SpinnerAnimation from "../../components/animations/SpinnerAnimation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PublicRoutes = () => {
	const { setAuthToken, setIsLoading, authToken, isLoading, user } = useContext(AuthContext);
	const dataUser = user as any;
	

	return (
		<>
			{isLoading ? (
				<>
					<SpinnerAnimation />
				</>
			) : (
				<>{dataUser?.roles ? <Navigate to={"/"} /> : <Outlet />}</>
			)}
		</>
	);
};

export default PublicRoutes;
