import type { Prisma } from "@prisma/client";
export type User = Prisma.UserGetPayload<{}>;
export type UserWithoutPassword = Omit<User, "password">;
export type UserCreateInput = Prisma.UserUncheckedCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

export type UserStatus = {
        id: number,
        status: "online" | "offline"
    }

export type UserCallback = (response: {
    userStatuses: UserStatus[] 
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
