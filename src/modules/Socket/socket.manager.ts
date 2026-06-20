import { authSocketMiddleware } from "../../middlewares/socket-auth.middleware";
import { ChatSocketController } from "../Chat/chat.socket.controller";
import { MessageSocketController } from "../Message/message.socket.controller";
import { UserSocketController } from "../User/user.socket.controller";
import type {
	AuthenticatedSocket,
	ClientEvents,
	ServerEvents,
	SocketData,
	SocketManagerContract,
} from "./socket.types";
import { Server as SocketServer } from "socket.io";
export const SocketManager: SocketManagerContract = {
	socketServer: null,
	initSocketServer(httpServer) {
		this.socketServer = new SocketServer<
			ClientEvents,
			ServerEvents,
			{},
			SocketData
		>(httpServer, {
			cors: {
				origin: "*",
			},
		});
		this.socketServer.use(authSocketMiddleware);
		this.socketServer.on("connection", (socket: AuthenticatedSocket) => {
			console.log("Socket was connected", socket.data.userId);
			ChatSocketController.registerHandlers(socket);
			if (this.socketServer) {
				MessageSocketController.registerHandlers(this.socketServer, socket);
				UserSocketController.registerHandlers(this.socketServer, socket);
			}
			socket.on("disconnect", () => {
				console.log("disconnected", socket.id);
			});
		});
	},
};
