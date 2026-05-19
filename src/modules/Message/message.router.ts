import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { MessageController } from "./message.controller";


export const MessageRouter = Router()

MessageRouter.get("/:chatId", authMiddleware, MessageController.getChatMessages)

