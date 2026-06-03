import { Prisma } from "@prisma/client";
export type IMessage = Prisma.MessageGetPayload<{}>;

export type IMessageCreate = Omit<
	Prisma.MessageUncheckedCreateInput,
	"chatAsLastMessageId"
>;
export interface IMessageWithPagination {
	data: IMessage[];
	meta: {
		nextCursor: number | null;
		hasMore: boolean;
	};
}
export interface IPaginationData {
	cursor?: number;
	limit?: number;
}
export interface IMessagePayload {
	type: "text" | "media";
	text?: string;
	chatId: number;
	mediaUrl?: string;
}

export type ICreateMessage = {
	text: string;
	type: "media";
	senderId: number;
};

export interface IMessageCreateDTO extends ICreateMessage {
	chatId: number;
	mediaUrl: string;
}