
import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthenticationError } from "../errors";
import { ENV } from "../config";

interface TokenPayload {
	userId: number;
}


export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			next(new AuthenticationError("Authorization header missing or invalid"));
			return;
		}
		const token = authHeader.split(" ")[1];

		if (!token) {
			next(new AuthenticationError("Token is missing in the header"));
			return;
		}

		const { userId } = verify(token, ENV.SECRET_KEY) as TokenPayload;
		res.locals.userId = userId;
		next();
	} catch (err) {
		console.error("Authentication error:", err);
		next(new AuthenticationError("Invalid or expired token"));
	}
}
