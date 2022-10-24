import { AuthAdapter } from "../api/fetchAuth";

const authAdapter = new AuthAdapter();

export const getAllRooms = async () => {
	const response: any = await authAdapter.get("/rooms");

	return response;
};

export const getRoomById = async (id: string) => {
	const response: any = await authAdapter.get(`/rooms/${id}`);

	return response;
};
