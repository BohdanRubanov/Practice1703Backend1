import { ChatService } from "./chat.service";
import { ChatControllerContract } from "./types/chat.contracts";
import { BadRequestError } from "../../errors";
export const ChatController: ChatControllerContract = {
    getChats: async (req, res, next) => {
        try {
            const userId = res.locals.userId;
            const userChats = await ChatService.getAllWithChatParticipantInfo(userId);
            res.status(200).json(userChats);
        }
        catch (error) {
            next(error);
        }
    },
    createChat: async (req, res, next) => {
        try {
            const userId = res.locals.userId;
            const participantId = req.body.contactUserId ?? req.query.participantId;
            if (Number.isNaN(Number(participantId))) {
                throw new BadRequestError("Participant ID must be an integer");
            }
            const createdChat = await ChatService.createChat(userId, Number(participantId));
            res.status(200).json(createdChat);
        }
        catch (error) {
            next(error);
        }
    }
};
