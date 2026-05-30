import { client } from "../../client/client";
import { MessageRepositoryContract } from "./types/message.contracts";
export const MessageRepository: MessageRepositoryContract = {
    getChatMessages: async (chatId, paginationData) => {
        const limit = Math.min(Math.max(paginationData.limit ?? 20, 1), 50);
        const messages = await client.message.findMany({
            where: { chatId },
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            take: limit + 1,
            ...(paginationData.cursor
                ? {
                    cursor: { id: paginationData.cursor },
                    skip: 1,
                }
                : {}),
        });
        const hasMore = messages.length > limit;
        const data = hasMore ? messages.slice(0, limit) : messages;
        const nextCursor = hasMore ? data[data.length - 1]?.id ?? null : null;
        return {
            data,
            meta: {
                nextCursor,
                hasMore,
            },
        };
    },
    create: async (data) => {
        const message = await client.message.create({
            data: {
                ...data,
                chatAsLastMessageId: data.chatId,
            },
        });
        await client.chat.update({
            where: {
                id: data.chatId,
            },
            data: {
                lastMessageId: message.id,
            },
        });
        return message;
    },
    getAllByChatId: async (chatId) => {
        const data = await client.message.findMany({
            where: { chatId },
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        });
        return {
            data,
            meta: {
                nextCursor: null,
                hasMore: false,
            },
        };
    },
};
