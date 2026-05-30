import { Router } from "express";
import { authMiddleware, procImgMiddleware, uploadMiddleware, validateMiddleware } from "../../middlewares";
import { ContactController } from "./contact.controller";
import { ContactSchema } from "./contact.shema";
export const ContactRouter = Router();
ContactRouter.get("", authMiddleware, ContactController.getAll);
ContactRouter.post("", authMiddleware, uploadMiddleware.single("avatar"), procImgMiddleware(300, 100), validateMiddleware(ContactSchema.contact), ContactController.create);
ContactRouter.get("/:id", authMiddleware, ContactController.getById);
