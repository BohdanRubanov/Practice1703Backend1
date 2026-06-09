import { NotFoundError, AuthenticationError, ConflictError } from "../../errors";
import type { UserServiceContract } from "./types";
import { UserRepository } from "./user.repository";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ENV } from "../../config";
export const UserService: UserServiceContract = {
    async login({ email, password }) {
        const user = await UserRepository.getByEmail(email);
        if (!user) {
            throw new NotFoundError("User");
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError("Invalid password");
        }
        const token = sign({ userId: user.id }, ENV.SECRET_KEY, {
            expiresIn: "7d",
        });
        return { token };
    },
    async register(data) {
        const existingUser = await UserRepository.getByEmail(data.email);
        if (existingUser) {
            throw new ConflictError("User with this email or username already exists");
        }
        const hashedPassword = await hash(data.password, 10);
        const newUser = await UserRepository.create({
            ...data,
            password: hashedPassword,
        });
        const token = sign({ userId: newUser.id }, ENV.SECRET_KEY, {
            expiresIn: "7d",
        });
        return { token };
    },
    async me(id) {
        const user = await UserRepository.getByIdWithoutPassword(id);
        if (!user)
            throw new NotFoundError("User");
        return user;
    },
    async getUserByUsername(username) {
        const user = await UserRepository.getUserByUsername(username);
        if (!user) {
            throw new NotFoundError("User");
        }
        return user;
    },
    async updateLastSeenAt(id) {
        return await UserRepository.update({ id }, { lastSeenAt: new Date() });
    },
};
