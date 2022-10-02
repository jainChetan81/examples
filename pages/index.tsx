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
					<Link href="/portfolio">
						<a>Portfolio</a>
					</Link>
				</li>
				<li>
					<Link href="/dribble">
						<a>Dribble Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/traversy_grid/testimonial">
						<a>Traversy Grid | Testimonials</a>
					</Link>
				</li>
				<li>
					<Link href="/mobile_cards">
						<a>Animated Cards With Mobile Fallback(Kevin)</a>
					</Link>
				</li>
				<li>
					<Link href="/react_select">
						<a>React Select</a>
					</Link>
				</li>
				<li>
					<Link href="/dynamic_form">
						<a>Dynamic Forms</a>
					</Link>
				</li>
				<li>
					<Link href="/react_flow">
						<a>React Flow</a>
					</Link>
				</li>
				<li>
					<Link href="/tilting_cards">
						<a>Tilting Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/flipping_cards">
						<a>Flipping Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/todo-list">
						<a>Todo List</a>
					</Link>
				</li>
				<li>
					<Link href="/matrix">
						<a>Matrix Rain</a>
					</Link>
				</li>
				<li>
					<Link href="/parallax">
						<a>Parallax Effect</a>
					</Link>
				</li>
				<li>
					<Link href="/skribble">
						<a>Skribble Cheat</a>
					</Link>
				</li>
				<li>
					<Link href="/toggle_buttons">
						<a>CSS Toggle Buttons</a>
					</Link>
				</li>
				<li>
					<Link href="/react-query">
						<a>React Query Detailed(Net Ninja)</a>
					</Link>
				</li>
				<li>
					<Link href="/testing">
						<a>React Testing Library</a>
					</Link>
				</li>
				<li>
					<Link href="/cards">
						<a>Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/traversy_grid">
						<a>Traversy Grid</a>
					</Link>
				</li>
				<li>
					<Link href="/grid">
						<a>Grid Basics</a>
					</Link>
				</li>
				<li>
					<Link href="/imagekit">
						<a>ImageKit Example</a>
					</Link>
				</li>
				<li>
					<Link href="/audio_book_reader">
						<a>Audio Book Reader</a>
					</Link>
				</li>
				<li>
					<Link href="/auto_animate">
						<a>Auto Animate example</a>
					</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default Loading(Home);
