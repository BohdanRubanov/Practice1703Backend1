import type { Server as SocketServer, Socket } from "socket.io";
import type { Server } from "node:http";
import type { ChatClientEvents, ChatServerEvents } from "../Chat/types/chat.contracts";
import type {
	MessageClientEvents,
	MessageServerEvents,
} from "../Message/types/message.contracts";
import { UserEvents } from "../User";

export interface SocketManagerContract {
	socketServer: ServerSocket | null;
	initSocketServer: (httpServer: Server) => void;
}
export type ServerEvents = MessageServerEvents & ChatServerEvents;
export type ClientEvents = ChatClientEvents &
	MessageClientEvents &
	UserEvents;
export interface SocketData {
	userId: number;
}
export type AuthenticatedSocket = Socket<
	ClientEvents,
	ServerEvents,
	{},
	SocketData
>;
export type ServerSocket = SocketServer<
	ClientEvents,
	ServerEvents,
	{},
	SocketData
>;
