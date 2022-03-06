import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux";

const ReduxToolkitCounter = () => {
	const toolkitCounter = useSelector((state: any) => state.toolkitCounter);
	const dispatch = useDispatch();
	return (
		<div>
			<h1>Redux ToolkitCounter</h1>
			<h2>{toolkitCounter}</h2>
			<button onClick={() => dispatch(actions.increment())}>Increment</button>
			<button onClick={() => dispatch(actions.decrement())}>Decrement</button>
			<button onClick={() => dispatch(actions.incrementByAmount(10))}>Increment by 10</button>
		</div>
	);
};

export default ReduxToolkitCounter;
