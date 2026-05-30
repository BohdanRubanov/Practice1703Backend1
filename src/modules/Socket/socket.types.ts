import type { Server as SocketServer, Socket } from "socket.io";
import type { Server } from "node:http";
import type { ChatClientEvents } from "../Chat/types/chat.contracts";
import type { MessageClientEvents, MessageServerEvents } from "../Message/types/message.contracts";
export interface SocketManagerContract {
    socketServer: ServerSocket | null;
    initSocketServer: (httpServer: Server) => void;
}
export type ServerEvents = MessageServerEvents;
export type ClientEvents = ChatClientEvents & MessageClientEvents;
export interface SocketData {
    userId: number;
}
export type AuthenticatedSocket = Socket<ClientEvents, ServerEvents, {}, SocketData>;
export type ServerSocket = SocketServer<ClientEvents, ServerEvents, {}, SocketData>;
