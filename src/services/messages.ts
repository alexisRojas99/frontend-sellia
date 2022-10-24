import { AuthAdapter } from "../api/fetchAuth";

const authAdapter = new AuthAdapter();

export const getAllMessages = async (params: object) => {
	const response: any = await authAdapter.get("/messages", {
		params,
	});

	return response;
};

export const createMessage = async (data: { id_user: string; id_room: string; message: string }) => {
	const response: any = await authAdapter.post("/messages", data);

	return response;
};
