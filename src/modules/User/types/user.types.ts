import type { Prisma } from "@prisma/client";
export type User = Prisma.UserGetPayload<{}>;
export type UserWithoutPassword = Omit<User, "password">;
export type UserCreateInput = Prisma.UserUncheckedCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
export type UserCallback = (response: {
    onlineUserIds: number[]
} | {
    status: "error";
    message?: string;
}) => void;
export interface UserPayload {
    userIds: number[];
}

// export interface UserClientEvents {
//     getOnlineUsers: 
// }
