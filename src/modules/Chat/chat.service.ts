import { ConflictError, NotFoundError } from "../../errors";
import { ContactRepository } from "../Contact/contact.repository";
import { ChatRepository } from "./chat.repository";
import type { ChatServiceContract } from "./types/chat.contracts";
export const ChatService: ChatServiceContract = {
    getAllWithChatParticipantInfo: async (userId) => {
        const chats = await ChatRepository.getAllWithChatParticipantInfo(userId);
        return chats;
    },
    getChatParticipants: async (chatId) => {
        const participants = await ChatRepository.getChatParticipants(chatId);
        if (!participants) {
            throw new NotFoundError("Chat");
        }
        return participants;
    },
    isUserChatParticipant: async (chatId, userId) => {
        const chat = await ChatRepository.getChatParticipants(chatId);
        if (!chat) {
            throw new NotFoundError("Chat");
        }
        const isUserInChat = chat.participants.some((participant) => {
            return participant.userId === userId;
        });
        return isUserInChat;
    },
    createChat: async (userId, participantId) => {
        const contact = await ContactRepository.getById(participantId, userId);
        if (!contact) {
            throw new ConflictError("User must be in contacts before creating chat");
        }
        const ifChatExists = await ChatRepository.getChatByParticipants(userId, participantId);
        if (!ifChatExists) {
            const createdChat = await ChatRepository.createChat(userId, participantId);
            return createdChat;
        }
        return ifChatExists;
    },
    getChatInfoById: async (chatId, ownerId) => {
        const chatWithLastMessage = await ChatRepository.getChatInfoById(chatId, ownerId)     
        if (!chatWithLastMessage){
            throw new NotFoundError("Chat")
        }   
        return chatWithLastMessage
    },
};
