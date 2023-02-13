import { createContext, type ReactNode, useCallback, useContext, useRef, useSyncExternalStore, memo } from "react";
type Store = string[];
function useStoreData() {
	const store = useRef<Store>(["a", "b"]);
	const get = useCallback(() => store.current, []);
	const subscribers = useRef(new Set<() => void>());
	const set = useCallback((value: Store[number], idx: number, addNew = false) => {
		console.log(value, idx, addNew);
		if (!addNew) store.current[idx] = value;
		else {
			const newStore = [...store.current];
			newStore.splice(idx + 1, 0, value);
			console.log(newStore);
			store.current = [...newStore];
		}
		subscribers.current.forEach((callback) => callback());
	}, []);
	const subscribe = useCallback((callback: () => void) => {
		subscribers.current.add(callback);
		return () => subscribers.current.delete(callback);
	}, []);

	return { get, set, subscribe };
}
type UseStoreData = ReturnType<typeof useStoreData>;
const FirstContext = createContext<null | UseStoreData>(null);

const FirstProvider = ({ children }: { children: ReactNode }) => {
	const store = useStoreData();
	return <FirstContext.Provider value={store}>{children}</FirstContext.Provider>;
};
type ReturnStore<T> = [T, (value: Store[number], idx: number, addNew?: boolean) => void];
function useStore<Selector>(selector: (store: Store) => Selector): ReturnStore<Selector> {
	const store = useContext(FirstContext);
	if (!store) throw new Error("StoreContext is not defined");
	const state = useSyncExternalStore(
		store.subscribe,
		() => selector(store.get()),
		() => selector(store.get())
	);
	return [state, store.set];
}

const First = () => {
	return (
		<section>
			<ul>
				<li>
					Create four blocks in the top where clicking between the blocks will add a new block there and clicking on the box will allow you
					to edit the text.
				</li>
			</ul>
			<FirstProvider>
				<BoxList />
			</FirstProvider>
		</section>
	);
};

export default First;
const BoxList = () => {
	const [store, updateData] = useStore((state) => state);
	console.log("rerendering box-list");
	return (
		<ul style={{ display: "flex", justifyContent: "flex-start" }}>
			{store.map((item, index) => (
				<li key={item} style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
					<Box idx={index} />
					{index < store.length - 1 && <button onClick={() => updateData("", index, true)}>+</button>}
				</li>
			))}
		</ul>
	);
};
const MemoBox = ({ idx }: { idx: number }) => {
	const [state, updateData] = useStore((state) => state[idx]);
	console.log(state);
	return <input style={{ width: "50px" }} min={1} maxLength={1} onChange={(e) => updateData(e.target.value, idx)} value={state} />;
};
const Box = memo(MemoBox);
