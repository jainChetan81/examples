import { NextPage } from "next";
import React from "react";
import { Provider } from "react-redux";
import { Counter, Layout } from "../components";
import { store } from "../redux";

const Redux: NextPage = () => {
	return (
		<Layout title="Redux Tutorial">
			<Provider store={store}>
				<Counter />
			</Provider>
		</Layout>
	);
};

export default Redux;
