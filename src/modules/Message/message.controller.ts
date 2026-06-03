import { MessageService } from "./message.service";
import { MessageControllerContract } from "./types/message.contracts";
import { BadRequestError } from "../../errors";
export const MessageController: MessageControllerContract = {
	getChatMessages: async (req, res, next) => {
		try {
			const chatId = Number(req.params.chatId);
			const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
			const limit = req.query.limit ? Number(req.query.limit) : undefined;
			if (Number.isNaN(chatId)) {
				throw new BadRequestError("Chat ID must be an integer");
			}
			if (cursor !== undefined && Number.isNaN(cursor)) {
				throw new BadRequestError("Cursor must be an integer");
			}
			if (limit !== undefined && Number.isNaN(limit)) {
				throw new BadRequestError("Limit must be an integer");
			}
			const paginationData: {
				cursor?: number;
				limit?: number;
			} = {};
			if (cursor !== undefined) paginationData.cursor = cursor;
			if (limit !== undefined) paginationData.limit = limit;
			const chatMessages = await MessageService.getChatMessages(
				chatId,
				res.locals.userId,
				paginationData,
			);
			res.status(200).json(chatMessages);
		} catch (error) {
			next(error);
		}
	},
	createMessageWithImage: async (req, res) => {
		try {
			const chatId = Number(req.params.chatId);
			const userId = Number(res.locals.userId);
			const { senderId, ...body } = req.body;
			if (Number.isNaN(chatId)) {
				throw new BadRequestError("Chat ID must be an integer");
			}
			const data = {
				chatId: Number(chatId),
				mediaUrl: req.file?.filename || null,
				senderId: userId,
				...body,
			};
			const createdMessage = await MessageService.create(data);
			res.status(201).json(createdMessage);
		} catch (error) {
			console.log(error);
		}
	},
};
