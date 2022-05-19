import { NextPage } from "next";
import { Layout } from "../components";

const Toggle: NextPage = () => {
	return (
		<Layout title="CSS Toggle Buttons">
			<section className="toggle_buttons">
				<input type="checkbox" id="check" className="toggle" />
				<label htmlFor="check">Checked?</label>
				<input type="checkbox" disabled id="check-disabled" className="toggle" />
				<label htmlFor="check-disabled">Disabled</label>
			</section>
		</Layout>
	);
};

export default Toggle;
