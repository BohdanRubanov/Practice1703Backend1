import type { NextFunction, Request, Response } from "express";
import {
	IMessage,
	IMessageWithPagination,
	IPaginationData,
	IMessageCreate,
} from "./message.types";
import { AuthenticatedSocket, ServerSocket } from "../../Socket/socket.types";

export interface MessageControllerContract {
	getChatMessages: (
		req: Request<
			{ chatId: string },
			IMessage | string,
			object,
			{ page: string },
			{ userId: number }
		>,

		res: Response<// IMessage[] | string
		IMessageWithPagination>,
		next: NextFunction,
	) => void;
}

export interface MessageServiceContract {
	// getChatMessages: (chatId: number) => Promise<IMessage[]>
	getChatMessages: (
		chatId: number,
		pagination: IPaginationData,
	) => Promise<IMessageWithPagination>;
	getAllByChatId: (chatId: number) => Promise<IMessageWithPagination>;
	create: (data: IMessageCreate) => Promise<IMessage>;
}

export interface MessageRepositoryContract {
	// getChatMessages: (chatId: number) => Promise<IMessage[]>
	getChatMessages: (
		chatId: number,
		pagination: IPaginationData,
	) => Promise<IMessageWithPagination>;
	getAllByChatId: (chatId: number) => Promise<IMessageWithPagination>;
	create: (data: IMessageCreate) => Promise<IMessage>;
}

export interface MessageClientEvents {
		sendMessage: (data: IMessageCreate) => void;
	}

export interface MessageServerEvents {
		newMessage: (data: IMessage) => void;
	}

export interface MessageSocketControllerContract {
		registerHandlers: (
			socketServer: ServerSocket,
			socket: AuthenticatedSocket,
		) => void;
		sendMessage: (
			socketServer: ServerSocket,
			socket: AuthenticatedSocket,
			data: IMessageCreate,
		) => void;
		newMessage: (socketServer: ServerSocket, message: IMessage) => void;
	}
