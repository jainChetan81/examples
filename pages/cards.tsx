import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components";
import Loading from "../hoc/Loading";

const Cards: NextPage = () => {
	return (
		<Layout title="Cards">
			<div className="flex">
				{[0, 1, 2].map((i) => (
					<div className="card" key={i}>
						<div className="rank">3</div>
						<div className="front">
							<Image
								className="thumbnail"
								src="https://ik.imagekit.io/clhowstalgz/games/anthem.jpg"
								height={250}
								width={200}
								alt="game"
							/>
							<h2 className="name">Project Name</h2>
							<p className="links">
								<a href="https://github.com/joaotuliojt/github-search" target="_blank" rel="noreferrer">
									<Image
										src="https://ik.imagekit.io/clhowstalgz/icons/github-icon.svg"
										height={40}
										width={40}
										alt="GitHub"
									/>
								</a>
								<a
									href="https://github-search-blond.vercel.app/"
									className="-mt-1"
									target="_blank"
									rel="noreferrer"
								>
									<Image
										src="https://ik.imagekit.io/clhowstalgz/icons/external-link-icon.svg"
										alt="Visitor site"
										height={40}
										width={40}
									/>
								</a>
							</p>
							<div className="stats">
								<p className="viewers">539.9k</p>
								<div className="streamers">
									<Image
										src="https://ik.imagekit.io/clhowstalgz/chetan"
										width={30}
										height={30}
										alt="a"
									/>
								</div>
							</div>
						</div>
						<div className="back">
							<div className="streaming-info">
								<p className="game-stat">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae optio dolores,
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae optio dolores,
									quaerat
								</p>
							</div>
							<Link href="/drag">
								<a className="btn">Read More</a>
							</Link>
							<div className="streamers">
								<div className="streamer">
									<div className="icon">
										<Image
											src="https://ik.imagekit.io/clhowstalgz/icons/react-icon.svg"
											width={30}
											height={30}
											alt="a"
										/>
									</div>
									<p className="name">React</p>
								</div>
								<div className="streamer">
									<div className="icon">
										<Image
											src="https://ik.imagekit.io/clhowstalgz/icons/typescript-icon.svg"
											width={30}
											height={30}
											alt="a"
										/>
									</div>
									<p className="name">Typescript</p>
								</div>
								<div className="streamer">
									<div className="icon">
										<Image
											src="https://ik.imagekit.io/clhowstalgz/icons/css-icon.svg?tr=w-30,h-30,f-png"
											width={30}
											height={30}
											alt="a"
										/>
									</div>
									<p className="name">CSS</p>
								</div>
							</div>
						</div>
						<div className="background"></div>
					</div>
				))}
			</div>
			<Link href="/loader">
				<a className="check-btn" id="check">
					drag
				</a>
			</Link>
		</Layout>
	);
};

export default Loading(Cards);
