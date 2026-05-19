import { authSocketMiddleware } from "../../middlewares/socket-auth.middleware";
import { ChatSocketController } from "../Chat/chat.socket.controller";
import { MessageSocketController } from "../Message/message.socket.controller";


import type {
	AuthenticatedSocket,
	ServerSocket,
	SocketManagerContract,
} from "./socket.types";
import { Server as SocketServer } from "socket.io";

export const SocketManager: SocketManagerContract = {
	socketServer: null,
	initSocketServer(httpServer) {
		this.socketServer = new SocketServer<ServerSocket>(httpServer, {
			cors: {
				origin: "*",
			},
		});

		this.socketServer.use(authSocketMiddleware);

		this.socketServer.on("connection", (socket: AuthenticatedSocket) => {
			console.log("Socket was connected", socket.data.userId);
			console.log(socket.rooms);
			socket.join(`user-${socket.data.userId}`);
			ChatSocketController.registerHandlers(socket);
			if (this.socketServer) {
				MessageSocketController.registerHandlers(this.socketServer, socket);
			}
			console.log(socket.rooms);
			socket.on("disconnect", () => {
				console.log("disconnected", socket.id);
			});
		});
	},
};
