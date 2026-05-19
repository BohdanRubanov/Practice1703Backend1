import { UserService } from "../User/user.service";
import { ContactService } from "./contact.service";
import { ContactControllerContract } from "./types/contact.contracts";

export const ContactController: ContactControllerContract = {
    async getAll (req, res, next) {
        try{
            const userId = res.locals.userId
            const contacts = await ContactService.getAll(userId)
            res.status(200).json(contacts)
        }catch(error){
            next(error)
        }

    },
    async getById(req, res, next) {
        try{
            const userId = res.locals.userId
            const id = Number(req.params.id)
            if (isNaN(id)) {
                return res.status(400).json("Invalid contact ID format" );
            }
            const contact = await ContactService.getById(userId,id)
            res.status(200).json(contact)
        }catch(error){
            next(error)
        }
    },
    async create(req, res, next) {
        try{
            const userId = res.locals.userId
            const body = req.body
            console.log(body)
            const avatar = req.file?.filename
            const contact = await ContactService.create(body,userId,avatar as string)
            res.status(200).json(contact)
        }catch(error){
            next(error)
        }
    }
}