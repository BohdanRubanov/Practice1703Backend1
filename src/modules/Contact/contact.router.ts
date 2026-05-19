import { Router } from "express";
import { authMiddleware, errorMiddleware, procImgMiddleware, uploadMiddleware } from "../../middlewares";
import { ContactController } from "./contact.controller";

export const ContactRouter = Router();

ContactRouter.get("", authMiddleware, ContactController.getAll)

ContactRouter.post("", authMiddleware,
        uploadMiddleware.single("avatar"),
        procImgMiddleware(300, 100)
        , ContactController.create)
        
ContactRouter.get("/:id", authMiddleware, ContactController.getById)