import axios from "axios";

export const fetchAxios = () => {
	const token = localStorage.getItem("x-access-token");

	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_HOST,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return instance;
};
