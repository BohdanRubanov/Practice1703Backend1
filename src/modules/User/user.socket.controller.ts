import {  UserSocketControllerContract } from "./types";
import { UserService } from "./user.service";

export const UserSocketController: UserSocketControllerContract =  {
    registerHandlers(socket, socketServer) {
        socket.join(`user_${socket.data.userId}`)
        UserService.updateLastSeenAt(socket.data.userId)        
        socket.on("getUsersOnline", (data, ack) => {
            this.getUsersOnline(socketServer, data, ack)
        })        
        socket.on('disconnect', () => {
            UserService.updateLastSeenAt(socket.data.userId)        
        })
    },

    async getUsersOnline(socketServer, data, ack) {
        const onlineUsersIds = data.userIds.filter((userId) => {
            return this.isUserOnline(userId, socketServer)
        })

        if (ack){
            ack({onlineUserIds: onlineUsersIds})
        }
    },
    
    async isUserOnline(userId, socketServer){
        return socketServer.sockets.adapter.rooms.has(`user_${userId}`)
    }
} 