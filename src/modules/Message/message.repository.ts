import { client } from "../../client/client";
import { MessageRepositoryContract } from "./types/message.contracts";

export const MessageRepository: MessageRepositoryContract = {
	getChatMessages: async (chatId, paginationData) => {
		const [messages, pagination] = await client.message
			.paginate({
				where: {
					chatId: chatId,
				},
				include: {
					sender: true,
				},
				orderBy: {
					createdAt: "desc",
				},
			})
			.withPages({
				limit: 1,
				page: paginationData.page || 1,
				includePageCount: true,
			});

		return {
			messages,
			pagination,
		};
	},

	create: async (data) => {
		const message = await client.message.create({
			data,
		});
		return message;
	},

	getAllByChatId: async (chatId) => {
		try {
			const [messages, pagination] = await client.message
				.paginate({
					where: {
						chatId: chatId,
					},
					orderBy: {
						createdAt: "desc",
					},
				})
				.withPages({
					limit: 1,
					page: 2,
					includePageCount: true,
				});

			return {
				messages,
				pagination,
			};
		} catch (error) {
			throw error;
		}
	},
};
