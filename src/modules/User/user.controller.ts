import type { UserControllerContract } from "./types";
import { UserService } from "./user.service";
export const UserController: UserControllerContract = {
    async login(req, res, next) {
        try {
            const data = req.body;
            const result = await UserService.login(data);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    },
    
    async register(req, res, next) {
        try {
            const data = req.body;
            const result = await UserService.register({
                ...data,
                avatar: req.file?.filename as string,
            });
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    },
    async me(req, res, next) {
        try {
            const { userId } = res.locals;
            const result = await UserService.me(userId);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    },
    async getUserByUsername(req, res, next) {
        try {
            const { username } = req.params;
            if (!username) {
                return res.status(400).json({
                    message: "Username is required",
                });
            }
            const result = await UserService.getUserByUsername(username);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    },
};
