import React from "react";
import { Layout } from "../components";
import GenericRefBasedContext from "../components/ReactContext/GenericRefBasedContext";
import RefBasedFastContext from "../components/ReactContext/RefBasedFastContext";
import SimpleContext from "../components/ReactContext/SimpleContext";
import { SharedState } from "../components/GlobalHook";

const ReactContext = () => {
	return (
		<Layout title="React Context">
			ReactContext
			<SimpleContext />
			<RefBasedFastContext />
			<GenericRefBasedContext />
			<SharedState />
		</Layout>
	);
};

export default ReactContext;
