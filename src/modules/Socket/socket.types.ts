import type {
	DefaultEventsMap,
	Server as SocketServer,
	Socket,
} from "socket.io";
import type { Server } from "node:http";
export interface SocketManagerContract {
	socketServer: SocketServer | null;
	initSocketServer: (httpServer: Server) => void;
}

export type ServerEvents = DefaultEventsMap;

export type ClientEvents = DefaultEventsMap;

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
