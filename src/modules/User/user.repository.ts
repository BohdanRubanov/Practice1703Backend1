
import type { UserRepositoryContract } from "./types";


import { Prisma } from "@prisma/client";
import { client } from "../../client/client";
import { BadRequestError, ConflictError } from "../../errors";

export const UserRepository: UserRepositoryContract = {
	async getByEmail(email) {
		try {
			return await client.user.findUnique({
				where: { email },
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

	async getByIdWithoutPassword(id: number) {
		try {
			return await client.user.findUnique({
				where: { id },
				select: {
					id: true,
					email: true,
					username: true,
					avatar: true,
					name: true,
					surname: true, 
					lastSeenAt: true
				},
			});
		} catch (err) {
			throw err;
		}
	},

	async create(data) {
		try {
			return await client.user.create({
				data,
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === "P2002") {
					throw new ConflictError(
						"User with this email or username already exists",
					);
				}
			}
			throw err;
		}
	},
	async getUserByUsername(username) {
		try {
			return await client.user.findUnique({
				where: {
					username,
				},
				select: {
					id: true,
					email: true,
					username: true,
					avatar: true,
					name: true,
					surname: true,
					lastSeenAt: true,
				},
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error("Database request error");
			}

			throw new Error("Internal server error");
		}
	}
};
