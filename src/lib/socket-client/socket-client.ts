import io from "socket.io-client";

export class Socket {
	static socket(roomId?: string) {
		const socketIO = io(import.meta.env.VITE_SOCKET_HOST, {
			auth: {
				token: localStorage.getItem("x-access-token"),
			},
			extraHeaders: {
				Room: roomId || "",
			},
		});

		return socketIO;
	}

	static connection() {
		this.socket().on("connect", () => {
			console.log("online");
		});
	}

	static disconnect() {
		this.socket().disconnect();
	}

	static emit(channel: string, data: any) {
		this.socket().off(channel).emit(channel, data);
	}

	static suscribe(channel: string, callback: (data: any) => void, roomId?: string) {
		this.socket(roomId)
			.off(channel)
			.on(channel, (data: any) => {
				callback(data);
			});
	}

	static unsuscribe(channel: string) {
		this.socket().off(channel);
	}
}