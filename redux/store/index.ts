import { configureStore, createSlice } from "@reduxjs/toolkit";
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

// ---------------REDUX TOOLKIT-------------
export const counterSlice = createSlice({
	name: "counter",
	initialState: {
		toolkitCounter: 20,
	},
	reducers: {
		increment: (state) => {
			state.toolkitCounter++;
		},
		decrement: (state) => {
			state.toolkitCounter--;
		},
		incrementByAmount: (state, action: any) => {
			state.toolkitCounter += action.payload;
		},
	},
});
export const actions = counterSlice.actions;
export const toolkitStore = configureStore({
	reducer: counterSlice.reducer,
});
