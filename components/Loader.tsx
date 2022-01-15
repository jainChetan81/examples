import { FC } from "react";
import { Layout } from ".";

const Loader: FC = () => {
	return (
		<Layout title="Loader">
			<div className="loader webkit">
				<div className="spinner"></div>
				<h1>Chetan Jain</h1>
			</div>
		</Layout>
	);
};

export default Loader;
