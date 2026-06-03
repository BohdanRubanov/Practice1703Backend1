import type { NextFunction, Request, Response } from "express";
import { IMessage, IMessageWithPagination, IPaginationData, IMessageCreate, IMessagePayload, ICreateMessage, } from "./message.types";
import { AuthenticatedSocket, ServerSocket } from "../../Socket/socket.types";
export interface MessageControllerContract {
		getChatMessages: (
			req: Request<
				{
					chatId: string;
				},
				IMessageWithPagination | string,
				object,
				{
					cursor?: string;
					limit?: string;
				},
				{
					userId: number;
				}
			>,
			res: Response<
				IMessageWithPagination | string,
				{
					userId: number;
				}
			>,
			next: NextFunction,
		) => void;
		createMessageWithImage: (
			req: Request<
				{ chatId: string },
				IMessage | string,
				ICreateMessage,
				object
			>,
			res: Response<IMessage | string>,
			next: NextFunction,
		) => void;
	}
export interface MessageServiceContract {
    getChatMessages: (chatId: number, userId: number, pagination: IPaginationData) => Promise<IMessageWithPagination>;
    getAllByChatId: (chatId: number) => Promise<IMessageWithPagination>;
    create: (data: IMessageCreate) => Promise<IMessage>;
}
export interface MessageRepositoryContract {
    getChatMessages: (chatId: number, pagination: IPaginationData) => Promise<IMessageWithPagination>;
    getAllByChatId: (chatId: number) => Promise<IMessageWithPagination>;
    create: (data: IMessageCreate) => Promise<IMessage>;
}
export interface MessageClientEvents {
    sendMessage: (data: IMessagePayload) => void;
}
export interface MessageServerEvents {
    newChatMessage: (data: IMessage) => void;
}
export interface MessageSocketControllerContract {
    registerHandlers: (socketServer: ServerSocket, socket: AuthenticatedSocket) => void;
    sendMessage: (socketServer: ServerSocket, socket: AuthenticatedSocket, data: IMessagePayload) => void;
    newChatMessage: (socketServer: ServerSocket, message: IMessage) => void;
}
