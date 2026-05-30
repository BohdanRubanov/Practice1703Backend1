import { verify } from "jsonwebtoken";
import { AuthenticationError } from "../errors";
import { ENV } from "../config";
import { Socket } from "socket.io";
interface TokenPayload {
    userId: number;
}
export function authSocketMiddleware(socket: Socket, next: (err?: Error) => void) {
    try {
        const authenticate = socket.handshake.auth.token || socket.handshake.headers.token;
        if (!authenticate || !authenticate.startsWith("Bearer ")) {
            next(new AuthenticationError("Authorization header missing or invalid"));
            return;
        }
        const token = authenticate.split(" ")[1];
        if (!token) {
            next(new AuthenticationError("Token is missing in the header"));
            return;
        }
        const { userId } = verify(token, ENV.SECRET_KEY) as TokenPayload;
        socket.data.userId = userId;
        next();
    }
    catch (err) {
        console.error("Authentication error:", err);
        next(new AuthenticationError("Invalid or expired token"));
    }
}
