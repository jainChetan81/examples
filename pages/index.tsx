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
						<a>firebase</a>
					</Link>
				</li>
				<li>
					<Link href="/drag">
						<a>drag</a>
					</Link>
				</li>
				<li>
					<Link href="/loader">
						<a>loader</a>
					</Link>
				</li>
				<li>
					<Link href="/parallax">
						<a>parallax</a>
					</Link>
				</li>
				<li>
					<Link href="/query">
						<a>query</a>
					</Link>
				</li>
				<li>
					<Link href="/testing">
						<a>testing</a>
					</Link>
				</li>
				<li>
					<Link href="/matrix">
						<a>matrix</a>
					</Link>
				</li>
				<li>
					<Link href="/OBSERVER">
						<a>OBSERVER</a>
					</Link>
				</li>
			</ul>
		</Layout>
	);
};

export default Loading(Home);
