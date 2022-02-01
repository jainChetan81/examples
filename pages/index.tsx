import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components";
import Loading from "../hoc/Loading";

const Home: NextPage = () => {
	return (
		<Layout title="Home">
			<ul>
				<li>
					<Link href="/cards">
						<a>Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/firebase">
						<a>Firebase</a>
					</Link>
				</li>
				<li>
					<Link href="/dribble">
						<a>Dribble Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/loader">
						<a>Page Loader</a>
					</Link>
				</li>
				<li>
					<Link href="/parallax">
						<a>Parallax Effect</a>
					</Link>
				</li>
				<li>
					<Link href="/query">
						<a>React Query pagination</a>
					</Link>
				</li>
				<li>
					<Link href="/testing">
						<a>React Testing Library</a>
					</Link>
				</li>
				<li>
					<Link href="/matrix">
						<a>Matrix Rain</a>
					</Link>
				</li>
				<li>
					<Link href="/observer">
						<a>Intersection Observer</a>
					</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default Loading(Home);
