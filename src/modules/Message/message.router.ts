import { Router } from "express";
import { authMiddleware, procImgMiddleware, uploadMiddleware } from "../../middlewares";
import { MessageController } from "./message.controller";
export const MessageRouter = Router();
MessageRouter.get("/chat/:chatId", authMiddleware, MessageController.getChatMessages);
MessageRouter.get("/:chatId", authMiddleware, MessageController.getChatMessages);
MessageRouter.post(
	"/chats/:chatId",
	authMiddleware,
	uploadMiddleware.single("image"),
	procImgMiddleware(300, 90),
	MessageController.createMessageWithImage,
);  