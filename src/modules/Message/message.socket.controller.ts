import { MessageService } from './message.service';
import type { MessageSocketControllerContract } from './types/message.contracts';
export const MessageSocketController: MessageSocketControllerContract = {
    registerHandlers(socketServer, socket) {
        socket.on('sendMessage', (data) => {
            this.sendMessage(socketServer, socket, data);
        });
    },
    async sendMessage(socketServer, socket, data) {
        try {
            const message = await MessageService.create({
                ...data,
                senderId: socket.data.userId
            });
            this.newChatMessage(socketServer, message);
        }
        catch (error) {
            console.log(error);
        }
    },
    async newChatMessage(socketServer, message) {
        try {
            socketServer.to(`chat-${message.chatId}`).emit('newChatMessage', message);
        }
        catch (error) {
            console.log(error);
        }
    }
};
