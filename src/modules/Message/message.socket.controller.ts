import { MessageService } from "./message.service";
import type { MessageSocketControllerContract } from "./types/message.contracts";
export const MessageSocketController: MessageSocketControllerContract = {
	registerHandlers(socketServer, socket) {
		socket.on("sendMessage", (data) => {
			this.sendMessage(socketServer, socket, data);
		});
	},
	async sendMessage(socketServer, socket, data) {
		try {
			if (data.type === "media") {
				const mediaMessage = {
					id: Date.now(),
					type: data.type,
					text: data.text ?? null,
					mediaUrl: data.mediaUrl ?? null,
					senderId: socket.data.userId,
					chatId: data.chatId,
					chatAsLastMessageId: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				this.newChatMessage(socketServer, mediaMessage);
				return;
			}
			const message = await MessageService.create({
				...data,
				senderId: socket.data.userId,
			});
			this.newChatMessage(socketServer, message);
		} catch (error) {
			console.log(error);
		}
	},
	async newChatMessage(socketServer, message) {
		try {
			socketServer.to(`chat-${message.chatId}`).emit("newChatMessage", message);
		} catch (error) {
			console.log(error);
		}
	},
};
