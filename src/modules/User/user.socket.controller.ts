import type { UserSocketControllerContract, UserStatus } from "./types";
import { UserService } from "./user.service";

export const UserSocketController: UserSocketControllerContract = {
	subscriptions: new Map(),
	registerHandlers(socketServer, socket) {
		socket.join(`user-${socket.data.userId}`);
		this.notifySubscribers(socketServer, socket.data.userId, "online");
		UserService.updateLastSeenAt(socket.data.userId);

		socket.on("subscribeAndGetInitialStatuses", (userIds, ack) => {
			this.subscribeAndGetInitialStatuses(socketServer, socket, userIds, ack);
		});

		socket.on("getUserStatus", (userId, ack) => {
			this.getUserStatus(socketServer, userId, ack);
		});

		socket.on("disconnect", () => {
			this.notifySubscribers(socketServer, socket.data.userId, "offline");
			UserService.updateLastSeenAt(socket.data.userId);
		});
	},
	subscribeAndGetInitialStatuses(socketServer, socket, userIds, ack) {
		const statuses: UserStatus[] = userIds.map((userId) => {
			if (!this.subscriptions.has(userId)) {
				this.subscriptions.set(userId, new Set());
			}
			this.subscriptions.get(userId)?.add(socket.data.userId);

			return {
				userId,
				status: this.isUserOnline(socketServer, userId) ? "online" : "offline",
			};
		});

		if (typeof ack === "function") {
			ack({ statuses });
		}
	},
	isUserOnline(socketServer, userId) {
		return socketServer.sockets.adapter.rooms.has(`user-${userId}`);
	},
	notifySubscribers(socketServer, userId, status) {
		const watchers = this.subscriptions.get(userId);
		if (!watchers) return;

		const watcherRooms = Array.from(watchers).map(
			(watcherId) => `user-${watcherId}`,
		);

		if (watcherRooms.length > 0) {
			socketServer.to(watcherRooms).emit("statusUpdate", {
				userId,
				status,
			});
		}
	},
	getUserStatus(socketServer, userId, ack) {
		if (typeof ack === "function") {
			ack({
				userId,
				status: this.isUserOnline(socketServer, userId) ? "online" : "offline",
			});
		}
	},
};
