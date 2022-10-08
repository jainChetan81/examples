import { NextPage } from "next";
import { Layout, MatrixRain } from "../components";
import Loading from "../hoc/Loading";

const Matrix: NextPage = () => {
	return (
		<Layout title="Matrix Rain">
			<MatrixRain />
		</Layout>
	);
};

export default Loading(Matrix);
