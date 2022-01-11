import { Layout } from "../components";
import { FaPaperPlane } from "react-icons/fa";

const Drag = () => {
	const richestPeople = [
		"Jeff Bezos",
		"Bill Gates",
		"Warren Buffett",
		"Bernard Arnault",
		"Carl Icahn",
		"Amancio Ortega",
		"Larry Ellison",
		"Mark Zuckerberg",
		"Michael Bloomberg",
		"Larry Page",
		"Charles Koch",
		"David Koch",
	]; 
	return (
		<Layout title="Draggable list">
			<h1>Draggable List</h1>
			<p>Drag and drop the items into their own corresponding components</p>
			<ul className="draggable-list" id="draggable-list"></ul>
			<button className="check-btn" id="check">
				Check Order <FaPaperPlane />
			</button>
		</Layout>
	);
};

export default Drag;
