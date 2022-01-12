import { NextPage } from "next";
import { Characters, Layout } from "../components";

const Query: NextPage = () => {
	return (
		<Layout title="Rick and Morty">
			<h1>Rick and Morty</h1>
			<Characters />
		</Layout>
	);
};

export default Query;
