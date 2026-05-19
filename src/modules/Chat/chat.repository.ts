import { client } from "../../client/client";
import type { ChatRepositoryContract } from "./types/chat.contracts";

export const ChatRepository: ChatRepositoryContract = {
	getAllWithChatParticipantInfo: async (userId) => {
		const chats = await client.chat.findMany({
			where: {
				participants: {
					some: {
						userId: userId,
					},
				},
			},
			include: {
				participants: {
					where: { NOT: { userId: userId } },
					include: {
						user: {
							select: {
								id: true,
								name: true,
								surname: true,
								avatar: true,
								contactOf: {
									where: { ownerId: userId },
									select: {
										id: true,
										contactName: true,
										avatar: true,
										addedAt: true,
									},
								},
							},
						},
					},
				},
				lastMessage: {
					select: {
						text: true,
						createdAt: true,
						sender: {
							select: {
								name: true
							}
						}
						}
				}
			},
		});
		return chats;
	},

	getChatByParticipants: async (userId, userIdSecond) => {
		const ParticipantChat = await client.chat.findFirst({
			where: {
				AND: [
					{
						participants: {
							some: {
								userId: userId,
							},
						},
					},

					{
						participants: {
							some: {
								userId: userIdSecond,
							},
						},
					},
				],
			},			
			include: {
				participants: {
					where: { NOT: { userId: userId } },
					include: {
						user: {
							select: {
								id: true,
								username: true,
								avatar: true,
								lastSeenAt: true
							},
						},
					},
				},
			},
		});
		return ParticipantChat;
	},

	getChatParticipants: async (chatId) => {
		const participants = await client.chat.findUnique({
			where: {
				id: chatId,
			},
			include: {
				participants: true,
			},
		});
		return participants;
	},
	createChat: async (userId, participantId) => {
		const createdChat = await client.chat.create({
			data: {
				participants: {
					create: [
						{
							user: {
								connect: {
									id: userId
								}
							}
						},
						{
							user: {
								connect: {
									id: participantId
								}
							}
						}
					]
				}
			},
			include: {
				participants: {
					where: { NOT: { userId: userId } },
					include: {
						user: {
							select: {
								id: true,
								username: true,
								avatar: true,
								lastSeenAt: true
							},
						},
					},
				},
			},
		})

		return createdChat
	}
};
