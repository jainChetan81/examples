import { cloneDeep } from "lodash";
import { createContext, useCallback, useContext, useRef, useSyncExternalStore, type ReactNode } from "react";

function genericFastContext<TStore>(initialState: TStore) {
	type SET_STORE = (value: TStore | ((prevState: TStore) => TStore)) => void;
	type TStoreHook = {
		get: () => TStore;
		set: SET_STORE;
		subscribe: (callback: () => void) => () => void;
	};
	// we want a way to get set and subscribe to current store
	function useStoreData(): TStoreHook {
		const store = useRef<TStore>(initialState);
		const get = useCallback(() => store.current, []);

		const set = useCallback((value: TStore | ((prevState: TStore) => TStore)) => {
			if (typeof value === "function") {
				const prevState = cloneDeep(store.current);
				store.current = cloneDeep(value(prevState));
			} else {
				store.current = cloneDeep(value);
			}
			subscribers.current.forEach((callback) => callback());
		}, []);
		const subscribers = useRef(new Set<() => void>());
		const subscribe = useCallback((callback: () => void) => {
			subscribers.current.add(callback);
			return () => subscribers.current.delete(callback);
		}, []);
		return { get, set, subscribe };
	}

	type UseStoreData = ReturnType<typeof useStoreData>;
	// creating the context for passing values to the children
	const StoreContext = createContext<null | UseStoreData>(null);

	// making a provider to set the values from the hook we created above
	function StoreProvider({ children }: { children: ReactNode }) {
		const store = useStoreData();
		return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
	}
	function useStore<SelectorOutput>(
		selector: (store: TStore) => SelectorOutput
	): [SelectorOutput, (value: TStore | ((prevState: TStore) => TStore)) => void] {
		const store = useContext(StoreContext);
		if (!store) throw new Error("StoreContext is not defined");
		// had to add a server snapshot because of it causing bug
		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			() => selector(store.get())
		);
		return [state, store.set];
	}
	return { StoreProvider, useStore };
}

const { StoreProvider, useStore } = genericFastContext({ first: "John", last: "Doe" });
const TextInput = ({ value }: { value: "first" | "last" }) => {
	const [state, setState] = useStore((store) => store[value]);
	return (
		<div className="field" style={{ padding: "0.5rem" }}>
			{value}:{" "}
			<input
				value={state}
				onChange={(e) =>
					setState((p) => {
						return { ...p, [value]: e.target.value };
					})
				}
			/>
		</div>
	);
};

const Display = ({ value }: { value: "first" | "last" }) => {
	const [state] = useStore((store) => store[value]);
	return (
		<div className="value" style={{ padding: "0.5rem" }}>
			{value}: {state}
		</div>
	);
};

const FormContainer = () => {
	return (
		<div className="container" style={{ marginTop: "0.5rem", padding: "0.5rem 1.5rem", border: "1px solid #ccc" }}>
			<h5>FormContainer</h5>
			<TextInput value="first" />
			<TextInput value="last" />
		</div>
	);
};

const DisplayContainer = () => {
	return (
		<div className="container" style={{ marginTop: "0.5rem", padding: "0.5rem 1.5rem", border: "1px solid #ccc" }}>
			<h5>DisplayContainer</h5>
			<Display value="first" />
			<Display value="last" />
		</div>
	);
};

const ContentContainer = () => {
	return (
		<div className="container" style={{ marginTop: "0.5rem", padding: "0.5rem 1.5rem", border: "1px solid #ccc" }}>
			<h5>ContentContainer</h5>
			<FormContainer />
			<DisplayContainer />
		</div>
	);
};
function GenericRefBasedContext() {
	return (
		<StoreProvider>
			<div className="container" style={{ marginTop: "0.5rem", padding: "0.5rem 1.5rem", border: "1px solid #ccc" }}>
				<h5>GenericRefBasedContext</h5>
				<ContentContainer />
			</div>
		</StoreProvider>
	);
}

export default GenericRefBasedContext;

function a<T>(ab: T | ((v: T) => T)) {
	if (typeof ab === "function") {
		return ab("hello");
	} else return ab;
}
