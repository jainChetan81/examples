import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedLetters, Layout } from "../../components/Portfolio";

const Portfolio = () => {
	const [letterClass, setLetterClass] = useState<string>("text-animate");
	const nameArray: string[] = "lobodan".split("");
	const jobArray: string[] = "web developer".split("");
	useEffect(() => {
		setTimeout(() => {
			setLetterClass("text-animate-hover");
		}, 4000);
	}, []);

	return (
		<Layout title="Home | Portfolio">
			<div className="container home-page">
				<div className="text-zone">
					<h1>
						<span className={letterClass}>H</span>
						<span className={`${letterClass} _12`}>i,</span>
						<br /> <span className={`${letterClass} _13`}>I</span>
						<span className={`${letterClass} _14`}>&apos;m</span>
						<img src={"/portfolio/logo-s.png"} alt="developer" />
						<AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
						<br />
						<AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
					</h1>
					<h2>Frontend Developer / Backend Developer / DSA Developer</h2>
					<Link href="/portfolio/contact">
						<a className="flat-button">CONTACT ME</a>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Portfolio;
