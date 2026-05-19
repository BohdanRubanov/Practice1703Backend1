import { AppError } from "../../errors";
import { ChatService } from "./chat.service";
import { ChatSocketControllerContract } from "./types/chat.contracts";

export const ChatSocketController: ChatSocketControllerContract = {
	registerHandlers(socket){
		socket.on("joinChat", (data, ack) => {
			this.joinChat(socket, data, ack)
		})
		socket.on("leaveChat", (data) => {
			this.leaveChat(socket, data)
		})
	},
	async joinChat(socket, data, ack) {
		try {
			const isSocketParticipant = await ChatService.isUserChatParticipant(
				data.chatId,
				socket.data.userId,
			);
			if (isSocketParticipant) {
				socket.join(`chat-${data.chatId}`);
				if (ack) {

					ack({
						status: "ok",
					});
				}
			} else {
				if (ack) {
					ack({
						status: "error",
						message: "you are not chat participant",
					});
				}
			}
		} catch (error) {
			console.log(error);
			if (!ack) return;
			if (error instanceof AppError) {
				ack({
					status: "error",
					message: error.message,
				});
			}
			ack({
				status: "error",
				message: "unknown error",
			});
		}
	},
    leaveChat(socket, data){
        socket.leave(`chat-${data.chatId}`)
    }
};
