import { FaPaperPlane } from "react-icons/fa";
import Link from "next/link";
import Loading from "../hoc/Loading";
import { Layout } from "../components";
import { NextPage } from "next";

const Drag: NextPage = () => {
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
			<Link href="/">
				<a className="check-btn" id="check">
					Check Order <FaPaperPlane />
				</a>
			</Link>
			<Link href="/loader">
				<a className="check-btn" id="check">
					drag
				</a>
			</Link>
		</Layout>
	);
};

export default Loading(Drag);
