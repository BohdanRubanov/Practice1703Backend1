import { Chat } from "@prisma/client";
import type { AuthenticatedSocket } from "../../Socket/socket.types";
import type { CreateChat, IChat, IChatParticipant, IChatWithUsers, JoinChatCallback, JoinChatPayload, LeaveChatPayload, } from "./chat.types";
import type { NextFunction, Request, Response } from "express";
export interface ChatControllerContract {
    getChats: (req: Request<object, IChatWithUsers[] | string, object, object, {
        userId: number;
    }>, res: Response<IChatWithUsers[] | string>, next: NextFunction) => void;
    createChat: (req: Request<object, IChat | string, {
        contactUserId?: number | string;
    }, {
        participantId?: string;
    }, {
        userId: number;
    }>, res: Response<IChat | string>, next: NextFunction) => void;
}
export interface ChatServiceContract {
    getAllWithChatParticipantInfo: (userId: number) => Promise<IChatWithUsers[]>;
    isUserChatParticipant: (chatId: number, userId: number) => Promise<boolean>;
    getChatParticipants: (chatId: number) => Promise<IChatParticipant>;
    createChat: (userId: number, participantId: number) => Promise<IChat>;
}
export interface ChatRepositoryContract {
    getAllWithChatParticipantInfo: (userId: number) => Promise<IChatWithUsers[]>;
    getChatByParticipants: (userId: number, userIdSecond: number) => Promise<IChat | null>;
    getChatParticipants: (chatId: number) => Promise<IChatParticipant | null>;
    createChat: (userId: number, participantId: number) => Promise<IChat>;
}
export interface ChatClientEvents {
    joinChat: (data: JoinChatPayload, ack?: JoinChatCallback) => void;
    leaveChat: (data: LeaveChatPayload) => void;
}
export interface ChatSocketControllerContract {
    registerHandlers: (socket: AuthenticatedSocket) => void;
    joinChat: (socket: AuthenticatedSocket, data: JoinChatPayload, ack?: JoinChatCallback) => void;
    leaveChat: (socket: AuthenticatedSocket, data: LeaveChatPayload) => void;
}
