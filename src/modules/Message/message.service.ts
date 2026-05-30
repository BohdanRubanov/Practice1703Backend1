import { AuthenticationError } from "../../errors";
import { ChatService } from "../Chat/chat.service";
import { MessageRepository } from "./message.repository";
import { MessageServiceContract } from "./types/message.contracts";
export const MessageService: MessageServiceContract = {
    getChatMessages: async (chatId, userId, paginationData) => {
        const isParticipant = await ChatService.isUserChatParticipant(chatId, userId);
        if (!isParticipant) {
            throw new AuthenticationError("You are not a chat participant");
        }
        const chatMessages = await MessageRepository.getChatMessages(chatId, paginationData);
        return chatMessages;
    },
    create: async (data) => {
        const isParticipant = await ChatService.isUserChatParticipant(data.chatId, data.senderId);
        if (!isParticipant) {
            throw new AuthenticationError("You are not a chat participant");
        }
        const message = await MessageRepository.create(data);
        return message;
    },
    getAllByChatId: async (chatId) => {
        const getAllMessages = await MessageRepository.getAllByChatId(chatId);
        return getAllMessages;
    },
};
