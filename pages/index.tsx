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
					<Link href="/dribble">
						<a>Dribble Cards</a>
					</Link>
				</li>
				<li>
					<Link href="/mobile_cards">
						<a>Animated Cards With Mobile Fallback(Kevin)</a>
					</Link>
				</li>
				<li>
					<Link href="/youtube_sidebar">
						<a>Youtube Sidebar(Kyle Web Dev Simplified)</a>
					</Link>
				</li>
				<li>
					<Link href="/loader">
						<a>Page Loader</a>
					</Link>
				</li>
				<li>
					<Link href="/audio_book_reader">
						<a>Audio Book Reader</a>
					</Link>
				</li>
				<li>
					<Link href="/parallax">
						<a>Parallax Effect</a>
					</Link>
				</li>
				<li>
					<Link href="/query">
						<a>React Query pagination(Laith Harb)</a>
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
