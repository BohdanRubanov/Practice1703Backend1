import { MessageService } from "./message.service"
import { MessageControllerContract } from "./types/message.contracts"

export const MessageController: MessageControllerContract = {
    getChatMessages: async (req, res, next) => {
        try{
            const chatId = req.params.chatId
            const paginationData = { page: Number(req.query.page) }
            const chatMessages = await MessageService.getChatMessages(Number(chatId), paginationData)
            res.status(200).json(chatMessages)
        }catch (error) {
            next(error)
        }
    }
}