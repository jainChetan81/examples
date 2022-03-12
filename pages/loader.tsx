import { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components";
import Loader from "../components/Loader";
import Loading from "../hoc/Loading";

const loader: NextPage = () => {
	return (
		<Layout title="Loader">
			<Loader />
			<Link href="/">
				<a className="check-btn" id="check">
					index
				</a>
			</Link>
		</Layout>
	);
};

export default Loading(loader);
