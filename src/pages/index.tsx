import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components";
import Loading from "../hoc/Loading";

const Home: NextPage = () => {
	const notify = () => {
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				const notification = new Notification("Vanilla Notification", {
					body: "This is a vanilla notification",
					data: {
						url: "https://www.google.com",
					},
					icon: "https://doodleipsum.com/100x100/flat?i=0eb04614d2ff66e0c288922e95511051",
				});
				notification.addEventListener("close", (event) => {});
			}
		});
	};
	return (
		<Layout title="Home">
			<button onClick={() => notify()} style={{ marginInline: "auto" }}>
				push a notification
			</button>
			<ul className="main-list">
				<li>
					<Link href="/portfolio">Portfolio</Link>
				</li>
				<li>
					<Link href="/youtube">Youtube</Link>
				</li>
				<li>
					<Link href="/dynamic_form">Dynamic Forms</Link>
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
					<Link href="/todo-list">Todo List</Link>
				</li>
				<li>
					<Link href="/dribble">Dribble Cards</Link>
				</li>
				<li>
					<Link href="/matrix">Matrix Rain</Link>
				</li>
				<li>
					<Link href="/skribble">Skribble Cheat</Link>
				</li>
				<li>
					<Link href="/react-query">React Query Detailed(Net Ninja)</Link>
				</li>
				<li>
					<Link href="/grid">Grid Basics</Link>
				</li>
				<li>
					<Link href="/imagekit">ImageKit Example</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default Loading(Home);
