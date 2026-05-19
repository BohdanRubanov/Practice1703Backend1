import { ContactRepositoryContract } from "./types/contact.contracts";

import { Prisma } from "@prisma/client";
import { client } from "../../client/client";
import { BadRequestError, ConflictError } from "../../errors";

export const ContactRepository: ContactRepositoryContract = {
	async create(data,userId, filename) {
		try {
			return await client.contact.create({
				data: {
                    
                    owner: {
                        connect: {id: userId}
                    },
                    contactName:data.contactName,
					contactSurname: data.contactSurname,
                    avatar: filename,
                    contactUser: {
                        connect:{ id: Number(data.contactId)}
                    }
                    
                },
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === "P2000") {
					throw new BadRequestError("User");
				}
			}
			throw err;
		}
	},

	async getAll(userId) {
		try {
			return await client.contact.findMany({
				where: { ownerId: userId },
				include: {
					contactUser: {
						select: {
							id: true
						}
					}
				}
				// select: {
				// 	id: true,
					
				// },
			});
		} catch (err) {
			throw err;
		}
	},

	async getById(id,userId) {
		try {
			return await client.contact.findFirst({
				where: { 
                    contactUserId:id,
                    ownerId: userId
                    
                },
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === "P2000") {
					throw new BadRequestError("User");
				}
			}
			throw err;
		}
	},
};
