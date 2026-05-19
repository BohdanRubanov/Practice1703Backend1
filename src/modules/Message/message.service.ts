import { ValidationError } from "../../errors";
import { MessageRepository } from "./message.repository";
import { MessageServiceContract } from "./types/message.contracts";

export const MessageService: MessageServiceContract = {
	getChatMessages: async (chatId, paginationData) => {
		const chatMessages = await MessageRepository.getChatMessages(
			chatId,
			paginationData,
		);
		return chatMessages;
	},

	create: async (data) => {
		const message = await MessageRepository.create(data);
		return message;
	},

	getAllByChatId: async (chatId) => {
		const getAllMessages = await MessageRepository.getAllByChatId(chatId);
		return getAllMessages;
	},
};
