import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components";
import Skribble from "../components/Skribble";

const Words = () => {
	return (
		<Layout title="Cheat at Skribbl.io">
			<section className="skribbl">
				<Skribble />
			</section>
			<ReactQueryDevtools initialIsOpen={false} />
		</Layout>
	);
};

export default Words;
