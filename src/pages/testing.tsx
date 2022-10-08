import { NextPage } from "next";
import { Form, Layout } from "../components";

const Testing: NextPage = () => {
	return (
		<Layout title="React Testing Library">
			<div className="test-container">
				<Form />
			</div>
		</Layout>
	);
};

export default Testing;
