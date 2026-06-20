import type { Prisma } from "@prisma/client";
export type User = Prisma.UserGetPayload<{}>;
export type UserWithoutPassword = Omit<User, "password">;
export type UserCreateInput = Prisma.UserUncheckedCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;

export type UserStatus = {
	userId: number;
	status: "online" | "offline";
};

export type SubscribeAndGetInitialStatuses = (response: {
	statuses: UserStatus[];
}) => void;
export type GetOnlineUserCallback = (response: UserStatus) => void;
