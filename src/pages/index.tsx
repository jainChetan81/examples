import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components";
import { MouseTracker } from "../components/MouseTracker";

const Home: NextPage = () => {
	return (
		<Layout title="Home">
			<MouseTracker offset={{ x: 10, y: 10 }}>I TRACK U 👀</MouseTracker>
			<ul className="main-list">
				<li>
					<Link href="/portfolio">Portfolio</Link>
				</li>
				<li>
					<Link href="/react-context">React Context</Link>
				</li>
				<li>
					<Link href="/forms/create">Dynamic Forms</Link>
				</li>
				<li>
					<Link href="/react_flow">React Flow</Link>
				</li>
				<li>
					<Link href="/css_cards">CSS Only Cards</Link>
				</li>
				<li>
					<Link href="/react_select">React Select</Link>
				</li>
				<li>
					<Link href="/image_magnifier">Image Magnifier</Link>
				</li>
				<li>
					<Link href="/matrix">Matrix Rain</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default (Home);
