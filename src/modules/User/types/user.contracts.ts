import type { NextFunction, Request, Response } from "express";
import type {
	GetOnlineUserCallback,
	SubscribeAndGetInitialStatuses,
	User,
	UserCreateInput,
	UserStatus,
	UserUpdateInput,
	UserWhereUniqueInput,
	UserWithoutPassword,
} from "./user.types";
import type { InferType } from "yup";
import type { UserSchema } from "../user.schema";
import type { AuthenticatedSocket, ServerSocket } from "../../Socket/socket.types";
export interface UserControllerContract {
	login: (
		req: Request<
			object,
			object,
			InferType<typeof UserSchema.login>,
			{ token: string }
		>,
		res: Response<{ token: string }>,
		next: NextFunction,
	) => void;
	register: (
		req: Request<
			object,
			object,
			InferType<typeof UserSchema.register>,
			{ token: string }
		>,
		res: Response<{ token: string }>,
		next: NextFunction,
	) => void;
	me: (
		req: Request<
			object,
			UserWithoutPassword,
			object,
			object,
			{ userId: number }
		>,
		res: Response<UserWithoutPassword, { userId: number }>,
		next: NextFunction,
	) => void;
	getUserByUsername: (
		req: Request<
			{ username: string },
			UserWithoutPassword,
			object,
			object,
			{ userId: number }
		>,
		res: Response<UserWithoutPassword | { message: string }, { userId: number }>,
		next: NextFunction,
	) => void;
}
export interface UserServiceContract {
	login: (data: { email: string; password: string }) => Promise<{ token: string }>;
	register: (data: UserCreateInput) => Promise<{ token: string }>;
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
	subscriptions: Map<number, Set<number>>;
	registerHandlers: (
		socketServer: ServerSocket,
		socket: AuthenticatedSocket,
	) => void;
	subscribeAndGetInitialStatuses: (
		socketServer: ServerSocket,
		socket: AuthenticatedSocket,
		userIds: number[],
		ack?: SubscribeAndGetInitialStatuses,
	) => void;
	isUserOnline: (socketServer: ServerSocket, userId: number) => boolean;
	notifySubscribers: (
		socketServer: ServerSocket,
		userId: number,
		status: "online" | "offline",
	) => void;
	getUserStatus: (
		socketServer: ServerSocket,
		userId: number,
		ack: GetOnlineUserCallback,
	) => void;
}

export interface UserClientEvents {
	subscribeAndGetInitialStatuses: (
		userIds: number[],
		ack?: SubscribeAndGetInitialStatuses,
	) => void;
	getUserStatus: (userId: number, ack: GetOnlineUserCallback) => void;
}
export interface UserServerEvents {
	statusUpdate: (data: UserStatus) => void;
}
