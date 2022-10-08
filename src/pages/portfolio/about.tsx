import { useEffect, useState } from "react";
import { FaAngular, FaCss3, FaHtml5, FaJava, FaNode, FaReact } from "react-icons/fa";
import { AnimatedLetters, Layout } from "../../components/Portfolio";

const About = () => {
	const [letterClass, setLetterClass] = useState<string>("text-animate");
	const nameArray: string[] = "About me".split("");
	useEffect(() => {
		setTimeout(() => {
			setLetterClass("text-animate-hover");
		}, 3000);
	}, []);
	return (
		<Layout title="Portfolio | About">
			<div className="container about-page">
				<div className="text-zone">
					<h1>
						<AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
					</h1>
					<p>
						My name is Chetan Jain, I am a Full Stack Developer with great passion for programming. I am passionate
						about delivering solutions that add to people lives and at the same time challenge me. Improved my skills as
						a Front-End and Back-End developer
					</p>
					<p>
						I develop websites and applications using HTML, CSS, and JavaScript. I choose different technologies ranging
						from front end and back end to mobile applications and I always improve myself with each project that I
						choose to challenge myself with.
					</p>
					<p>
						I am seeking to find an opportunity to work in a fun and challenging environment that will encourage me to
						improve my skills and learn new ones as well as my aim is to work in the minimum amount required and
						delivering the fastest and best product desired.
					</p>
				</div>
				<div className="stage-cube-cont">
					<div className="cubespinner">
						<div className="face1">
							<FaAngular className="#dd0031" />
						</div>
						<div className="face2">
							<FaHtml5 className="#f06529" />
						</div>
						<div className="face3">
							<FaCss3 className="#28a4d9" />
						</div>
						<div className="face4">
							<FaReact className="#5ed4f4" />
						</div>
						<div className="face5">
							<FaNode className="#edd81d" />
						</div>
						<div className="face6">
							<FaJava className="#ec4v28" />
						</div>
					</div>
				</div>
			</div>
			{/* <Loader active type="pacman" /> */}
		</Layout>
	);
};

export default About;
