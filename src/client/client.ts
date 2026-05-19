import { ENV } from "../config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { pagination } from "prisma-extension-pagination";
import { paginate } from "prisma-extension-pagination";

const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL!,
});

export const client = new PrismaClient({
	adapter,
}).$extends({
  	model: {
		message: {
			paginate,	
		},
	},
})
// .$extends({
// 	pagination({
// 		pages: {
// 			limit: 10,
// 			includePageCount: true,
// 		},
// 	})		
// })