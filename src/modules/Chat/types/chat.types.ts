import type { Prisma } from "@prisma/client";

export type IChat = Prisma.ChatGetPayload<{}>;
export type IChatParticipant = Prisma.ChatGetPayload<{
    include: {
        participants: true
    }
}>;

export type IChatWithUsers = Prisma.ChatGetPayload<{
	include: {
		participants: {
			include: {
				user: {
					select: {
						id: true;
						name: true;
						surname: true;
						avatar: true;
						lastSeenAt: true,
						contactOf: {
							select: {
								id: true;
								contactName: true;
								avatar: true;
								addedAt: true;
							};
						};
					};
				};
			};
		};
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
	};
}>;

export interface JoinChatPayload {
    chatId: number
}

export interface LeaveChatPayload {
    chatId: number
}

export type JoinChatCallback = (
    response: { status: "ok" } | { status: "error"; message?: string}
) => void

export type CreateChat = Prisma.ChatUncheckedCreateInput