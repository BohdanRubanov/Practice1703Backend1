import type { Prisma } from "@prisma/client";
export type User = Prisma.UserGetPayload<{}>;
export type UserWithoutPassword = Omit<User, "password">;
export type UserCreateInput = Prisma.UserUncheckedCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput;
