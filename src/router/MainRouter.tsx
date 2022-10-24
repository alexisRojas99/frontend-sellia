import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/global/NavBar/NavBar";
import LoginView from "../views/Auth/LoginView";
import HomeUser from "../views/User/Home/HomeUser";
import RoomView from "../views/User/Room/RoomView";
import PrivateRoutesUser from "./private/user/PrivateRoutesUser";
import PublicRoutes from "./public/PublicRoutes";

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PrivateRoutesUser />}>
					<Route
						index
						element={
							<>
								<NavBar />
								<HomeUser />
							</>
						}
					/>
					<Route
						path="/room/:id"
						element={
							<>
								<NavBar />
								<RoomView />
							</>
						}
					/>
				</Route>
				<Route path="/login" element={<PublicRoutes />}>
					<Route index element={<LoginView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MainRouter;
