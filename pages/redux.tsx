import { NextPage } from "next";
import React from "react";
import { Provider } from "react-redux";
import { Counter, Layout, ReduxToolkitCounter } from "../components";
import { store, toolkitStore } from "../redux";

const Redux: NextPage = () => {
	return (
		<Layout title="Redux Tutorial">
			<Provider store={store}>
				<Counter />
			</Provider>
			<Provider store={toolkitStore}>
				<ReduxToolkitCounter />
			</Provider>
		</Layout>
	);
};

export default Redux;
