import { createContext, type ReactNode, useCallback, useContext, useRef, useSyncExternalStore } from "react";
type Store = {
	first: string;
	last: string;
};
type StoreHook = {
	get: () => Store;
	set: (value: Partial<Store>) => void;
	subscribe: (callback: () => void) => () => void;
};
// we want a way to get set and subscribe to current store
function useStoreData(): StoreHook {
	const store = useRef({
		first: "",
		last: "",
	});
	const get = useCallback(() => store.current, []);

	const set = useCallback((value: Partial<Store>) => {
		store.current = { ...store.current, ...value };
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

// create a custom hook to return store and setStore
function useStore<SelectorOutput>(
	selector: (store: Store) => SelectorOutput
): [SelectorOutput, (value: Partial<Store>) => void] {
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
const TextInput = ({ value }: { value: "first" | "last" }) => {
	const [state, setState] = useStore((store) => store[value]);
	return (
		<div className="field" style={{ padding: "0.5rem" }}>
			{value}: <input value={state} onChange={(e) => setState({ [value]: e.target.value })} />
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
function RefBasedFastContext() {
	return (
		<StoreProvider>
			<div className="container" style={{ marginTop: "0.5rem", padding: "0.5rem 1.5rem", border: "1px solid #ccc" }}>
				<h5>RefBasedFastContext</h5>
				<ContentContainer />
			</div>
		</StoreProvider>
	);
}

export default RefBasedFastContext;
