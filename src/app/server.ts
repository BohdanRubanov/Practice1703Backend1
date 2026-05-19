
import express from "express";
import cors from "cors";

import { AppRouter } from "./routes";
import { errorMiddleware } from "../middlewares";
import { ENV, uploadDir } from "../config";
import { Express } from "express-serve-static-core";
import { SocketManager } from "../modules/Socket/socket.manager";
import { createServer } from "http";


const app = express();
const httpServer = createServer(app);
SocketManager.initSocketServer(httpServer);
app.use(cors());
app.use("/media/", express.static(uploadDir));
app.use(express.json());
app.use(AppRouter);

app.use(errorMiddleware);

httpServer.listen(ENV.PORT, ENV.HOST, () => {
	console.log(`Server started on http://${ENV.HOST}:${ENV.PORT}`);
	console.log(`Web socket server started on ws://${ENV.HOST}:${ENV.PORT}`);
});

