import { UserSocketControllerContract } from "./types"

export const UserSocketController: UserSocketControllerContract = {
    isUserOnline(socketServer, userId){
        const userRoom = `user-${userId}`
        const room = socketServer.sockets.adapter.rooms.get(userRoom);
        return !!room
    }
}