import { createContext, useContext, useState } from "react";

// creating a hook for simple use of the context
// right now it is only used as type
export function useStoreData() {
	const [store, setStore] = useState({
		first: "",
		last: "",
	});
	return { store, setStore };
}
type UseStoreData = ReturnType<typeof useStoreData>;
// creating the context for passing values to the children
const StoreContext = createContext<null | UseStoreData>(null);

const TextInput = ({ value }: { value: "first" | "last" }) => {
	const { store, setStore } = useContext(StoreContext)!;
	return (
		<div className="field" style={{ padding: "0.5rem" }}>
			{value}:{" "}
			<input value={store![value]} onChange={(e) => setStore((prev) => ({ ...prev, [value]: e.target.value }))} />
		</div>
	);
};

const Display = ({ value }: { value: "first" | "last" }) => {
	const { store } = useContext(StoreContext)!;
	return (
		<div className="value" style={{ padding: "0.5rem" }}>
			{value}: {store![value]}
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
// so, Simple=>ContentContainer=>FormContainer=>2 * TextInput(for input fields)
//                             =>DisplayContainer=>2 * Display(for displaying the values)
function SimpleContext() {
	const [store, setStore] = useState({
		first: "",
		last: "",
	});
	return (
		<StoreContext.Provider value={{ store, setStore }}>
			<div className="container" style={{ marginTop: "0.5rem", padding: "0.5rem 1.5rem", border: "1px solid #ccc" }}>
				<h5>SimpleContext</h5>
				<ContentContainer />
			</div>
		</StoreContext.Provider>
	);
}

export default SimpleContext;
