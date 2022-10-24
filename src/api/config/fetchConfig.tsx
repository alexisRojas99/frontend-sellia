import axios from "axios";

export const fetchAxios = () => {
	const token = localStorage.getItem("x-access-token");

	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_HOST || "http://localhost:8000/api/v1",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return instance;
};
