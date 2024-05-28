type StoreCallback = (data: any) => void;

interface StoreSubscribeOptions {
	emitLatestOnSubscribe?: boolean;
}

interface StoreType {
	emit: (event: string, data: unknown) => void;
	latestEvents: Record<string, unknown>;
	subscribe: (event: string, callback: StoreCallback, options?: StoreSubscribeOptions) => void;
	subscribers: Record<string, StoreCallback[]>;
	unsubscribe: (event: string, callback: StoreCallback) => void;
}

export const store: StoreType = {
	latestEvents: {},
	subscribers: {},

	subscribe: (event, callback, options = { emitLatestOnSubscribe: true }) => {
		const { emitLatestOnSubscribe } = options;

		if (!store.subscribers[event]) store.subscribers[event] = [];
		store.subscribers[event]!.push(callback);

		if (emitLatestOnSubscribe && Object.prototype.hasOwnProperty.call(store.latestEvents, event)) {
			callback(store.latestEvents[event]);
		}
	},

	unsubscribe: (event, callback) => {
		if (!store.subscribers[event]) return;
		store.subscribers[event] = store.subscribers[event]!.filter((cb) => cb !== callback);
	},

	emit: (event, data) => {
		if (!store.subscribers[event]) return;
		store.latestEvents[event] = data;
		store.subscribers[event]!.forEach((callback) => {
			callback(data);
		});
	}
};
