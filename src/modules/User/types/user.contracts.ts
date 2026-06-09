import type { NextFunction, Request, Response } from "express";
import type {  User, UserCallback, UserCreateInput, UserPayload, UserUpdateInput, UserWhereUniqueInput, UserWithoutPassword, } from "./user.types";
import type { InferType } from "yup";
import type { UserSchema } from "../user.schema";
import type { AuthenticatedSocket, ServerSocket } from "../../Socket/socket.types";
export interface UserControllerContract {
    login: (req: Request<object, object, InferType<typeof UserSchema.login>, {
        token: string;
    }>, res: Response<{
        token: string;
    }>, next: NextFunction) => void;
    register: (req: Request<object, object, InferType<typeof UserSchema.register>, {
        token: string;
    }>, res: Response<{
        token: string;
    }>, next: NextFunction) => void;
    me: (req: Request<object, UserWithoutPassword, object, object, {
        userId: number;
    }>, res: Response<UserWithoutPassword, {
        userId: number;
    }>, next: NextFunction) => void;
    getUserByUsername: (req: Request<{
        username: string;
    }, UserWithoutPassword, object, object, {
        userId: number;
    }>, res: Response<UserWithoutPassword | {
        message: string;
    }, {
        userId: number;
    }>, next: NextFunction) => void;
}
export interface UserServiceContract {
    login: (data: {
        email: string;
        password: string;
    }) => Promise<{
        token: string;
    }>;
    register: (data: UserCreateInput) => Promise<{
        token: string;
    }>;
    me: (id: number) => Promise<UserWithoutPassword>;
    getUserByUsername: (username: string) => Promise<UserWithoutPassword>;
    updateLastSeenAt: (id: number) => Promise<User>;
}
export interface UserRepositoryContract {
    getByEmail: (email: string) => Promise<User | null>;
    getByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | null>;
    create: (data: UserCreateInput) => Promise<User>;
    getUserByUsername: (username: string) => Promise<UserWithoutPassword | null>;
    update: (where: UserWhereUniqueInput, data: UserUpdateInput) => Promise<User>;
}
export interface UserSocketControllerContract {
    registerHandlers: (socket: AuthenticatedSocket, socketServer: ServerSocket) => void;
    isUserOnline: (userId: number, socketServer: ServerSocket) => Promise<boolean>;
    getUsersOnline: (socketServer: ServerSocket, data: UserPayload, ack?: UserCallback) => void
}

export interface UserEvents {
    getUsersOnline: (data: UserPayload, ack?: UserCallback) => void;
}
