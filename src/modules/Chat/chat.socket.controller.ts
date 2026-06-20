import { AppError } from "../../errors";
import { ChatService } from "./chat.service";
import type { ChatSocketControllerContract } from "./types/chat.contracts";

export const ChatSocketController: ChatSocketControllerContract = {
    registerHandlers(socket) {
        socket.on("joinChat", (data, ack) => {
            this.joinChat(socket, data, ack);
        });
        socket.on("leaveChat", (data) => {
            this.leaveChat(socket, data);
        });
    },
    async joinChat(socket, data, ack) {
        try {
            const isSocketParticipant = await ChatService.isUserChatParticipant(data.chatId, socket.data.userId);
            if (isSocketParticipant) {
                socket.join(`chat-${data.chatId}`);
                if (ack) {
                    ack({
                        status: "ok",
                    });
                }
            }
            else {
                if (ack) {
                    ack({
                        status: "error",
                        message: "you are not chat participant",
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            if (!ack)
                return;
            if (error instanceof AppError) {
                ack({
                    status: "error",
                    message: error.message,
                });
            }
            ack({
                status: "error",
                message: "unknown error",
            });
        }
    },
    leaveChat(socket, data) {
        socket.leave(`chat-${data.chatId}`);
    },
    async chatUpdate(socketServer, socket, data){
        try {
            const chat = await ChatService.getChatInfoById(data.chatId, socket.data.userId)
            chat.participants.forEach((participant) => {
                if (socketServer.sockets.adapter.rooms.has(`user-${participant.userId}`)){
                    socketServer.to(`user-${participant.userId}`).emit("chatUpdate", chat)
                }
            }) 
            if (socketServer.sockets.adapter.rooms.has(`user-${socket.data.userId}`)){
                socketServer.to(`user-${socket.data.userId}`).emit("chatUpdate", chat)
            }
        
        }catch(error){
            console.log(error)
        }
    }
    }

