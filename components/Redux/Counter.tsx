import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Counter: FC = () => {
	const counter = useSelector((state: RootState) => {
		return state.counter;
	});
	const dispatch = useDispatch();
	return (
		<div>
			<h1>Counter</h1>
			<h2>{counter}</h2>
			<button onClick={() => dispatch({ type: "INC" })}>Increment</button>
			<button onClick={() => dispatch({ type: "DEC" })}>Decrement</button>
			<button onClick={() => dispatch({ type: "INC10", payload: 10 })}>Increment by 10</button>
		</div>
	);
};

export default Counter;
