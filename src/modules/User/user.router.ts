import {
	authMiddleware,
	procImgMiddleware,
	uploadMiddleware,
	validateMiddleware,
} from "../../middlewares";
import { UserSchema } from "./user.schema";
import { UserController } from "./user.controller";
import { Router } from "express";

export const UserRouter = Router();

UserRouter.post(
	"/login",
	validateMiddleware(UserSchema.login),
	UserController.login
);
UserRouter.post(
	"/register",
	uploadMiddleware.single("avatar"),
	procImgMiddleware(300, 100),
	validateMiddleware(UserSchema.register),
	UserController.register
);

UserRouter.get("/me", authMiddleware, UserController.me);

UserRouter.get("/username/:username", authMiddleware, UserController.getUserByUsername);
