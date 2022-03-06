import { createStore } from "redux";
const reducerFunction = (state = { counter: 10 }, action: any) => {
	console.log(action);
	switch (action.type) {
		case "INC":
			return { ...state, counter: state.counter + 1 };
		case "INC10":
			return { ...state, counter: state.counter + action.payload };
		case "DEC":
			return { ...state, counter: state.counter - 1 };
		default:
			return state;
	}
};
const store = createStore(reducerFunction);
export default store;
export type RootState = ReturnType<typeof reducerFunction>;
