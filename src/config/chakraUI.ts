import { createLocalStorageManager, extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;

export const manager = createLocalStorageManager("theme-mode");
