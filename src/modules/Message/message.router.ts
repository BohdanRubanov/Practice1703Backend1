import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { MessageController } from "./message.controller";
export const MessageRouter = Router();
MessageRouter.get("/chat/:chatId", authMiddleware, MessageController.getChatMessages);
MessageRouter.get("/:chatId", authMiddleware, MessageController.getChatMessages);
