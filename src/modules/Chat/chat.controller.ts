import { ChatService } from "./chat.service";
import { ChatControllerContract } from "./types/chat.contracts";

export const ChatController: ChatControllerContract = {
    getChats: async (req, res, next) => {
        try{
            const userId = res.locals.userId
            const userChats = await ChatService.getAllWithChatParticipantInfo(userId)
            res.status(200).json(userChats)
        }catch(error){
            next(error)
        }
    },
    createChat: async (req, res, next) => {
        try {
            const userId = res.locals.userId
            const participantId = req.query.participantId
            const createdChat = await ChatService.createChat(userId, Number(participantId))
            res.status(200).json(createdChat)
        }catch(error){
            next(error)
        }
    }
}