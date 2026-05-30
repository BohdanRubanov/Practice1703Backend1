import type { Prisma } from "@prisma/client";
export type Icontact = Prisma.ContactGetPayload<{}>;
export type createContact = Omit<Prisma.ContactCreateInput, "owner">;
