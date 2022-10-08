import { NextPage } from "next";
import { Layout } from "../../components";

const Traversy: NextPage = () => (
	<Layout title="Traversy Media | Grid">
		<section className="traversy_grid">
			<div className="item">Item 1</div>
			<div className="item">item 2</div>
			<div className="item">item 3</div>
			<div className="item">item 4</div>
			<div className="item">item 5</div>
			<div className="item">item 6</div>
			<div className="item">item 7</div>
			<div className="item">item 8</div>
			<div className="item">item 9</div>
		</section>
	</Layout>
);

export default Traversy;
