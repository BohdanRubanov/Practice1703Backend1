import { ServerResponse } from "node:http";
import {  UserSocketControllerContract, UserStatus } from "./types";
import { UserService } from "./user.service";



export const UserSocketController: UserSocketControllerContract =  {
    subscriptions:  new Map(),
    registerHandlers(socket, socketServer) {
        socket.join(`user_${socket.data.userId}`)
        this.notifySubscribers(socket, socketServer, "online")
        UserService.updateLastSeenAt(socket.data.userId)        
        socket.on("subscribeAndGetStatuses", (data, ack) => {
            this.subscribeAndGetStatuses(socket, socketServer, data, ack)
        })        
        socket.on('disconnect', () => {
            this.notifySubscribers(socket, socketServer, "offline") 
            UserService.updateLastSeenAt(socket.data.userId)    
        })
    },

    async subscribeAndGetStatuses(socket, SocketServer, data, ack) {
        const userStatuses: UserStatus[] = []
        data.userIds.forEach(async (userId) => {
            if (await this.isUserOnline(userId, SocketServer)){
                userStatuses.push({
                    id: userId,
                    status: "online"
                })
            } else {
                userStatuses.push({
                    id: userId,
                    status: "offline"
                })
            }
            if (!this.subscriptions.has(userId)) {
                this.subscriptions.set(userId, new Set())
            } 
            this.subscriptions.get(userId)?.add(socket.data.userId)
        })

        if (ack){
            ack({userStatuses: userStatuses})
        }
    },
    async isUserOnline(userId, socketServer){
        return socketServer.sockets.adapter.rooms.has(`user_${userId}`)
    },
    notifySubscribers(socket, socketServer, status){
        const mySubscribers = this.subscriptions.get(socket.data.userId)
        if (!mySubscribers){
            return
        }
        const subscriberRooms = Array.from(mySubscribers).map((subscriber) => {
            return `user_${subscriber}`
        })
        
        subscriberRooms?.forEach(async (subscriber) => {
            socketServer.to(subscriber).emit("statusUpdate", {
                id: socket.data.userId,
                status: status
            })
        })
    }
} 