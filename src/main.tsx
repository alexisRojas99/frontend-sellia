import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import theme, { manager } from "./config/chakraUI";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider colorModeManager={manager} theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<App />
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
);
