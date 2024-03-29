import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components";
import Loading from "../hoc/Loading";

const Home: NextPage = () => {
	const notify = async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				const notification = new Notification("Vanilla Notification", {
					body: "This is a vanilla notification",
					data: {
						url: "https://www.google.com",
					},
					icon: "https://doodleipsum.com/100x100/flat?i=0eb04614d2ff66e0c288922e95511051",
				});
				notification.addEventListener("close", () => {
					console.log("closed");
				});
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Layout title="Home">
			<button onClick={notify} style={{ marginInline: "auto" }}>
				push a notification
			</button>
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
					<Link href="/matrix">Matrix Rain</Link>
				</li>
				<li>
					<Link href="/grid">Grid Basics</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default Loading(Home);
