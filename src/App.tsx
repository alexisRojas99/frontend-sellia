import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import MainRouter from "./router/MainRouter";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<MainRouter />
			</AuthProvider>
		</div>
	);
}

export default App;
