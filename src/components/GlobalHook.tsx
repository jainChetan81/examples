import { log } from "console";
import { useGlobalState } from "../hooks/useGlobalState";
const SHARED_COUNT_KEY = "someUniqueKey";
const ComponentOne = () => {
	const [count, setCount] = useGlobalState<number>({
		initialState: 0,
		shareKey: SHARED_COUNT_KEY
	});

	return (
		<div>
			<h2>Component one</h2>
			<div>Count: {count}</div>
			<button onClick={() => setCount(count + 1)}>Add 1</button>
		</div>
	);
};
const ComponentTwo = () => {
	const [count, setCount] = useGlobalState<number>({
		initialState: 10,
		shareKey: SHARED_COUNT_KEY
	});

	return (
		<div>
			<h2>Component two</h2>
			<div>Count: {count}</div>
			<button onClick={() => setCount(count + 1)}>Add 1</button>
		</div>
	);
};

export const SharedState = () => {
	console.count("--------------RERENDERING-------");
	return (
		<div>
			<ComponentOne />
			<ComponentTwo />
		</div>
	);
};
