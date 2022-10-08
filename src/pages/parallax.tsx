import { useEffect } from "react";
import { FaBook, FaUsers, FaVideo } from "react-icons/fa";
import Rellax from "rellax";
import Loading from "../hoc/Loading";

const Parallax = () => {
	useEffect(() => {
		new Rellax(".rellax", {
			speed: -10,
			center: false,
			round: true,
			vertical: true,
			horizontal: false,
		});
	}, []);
	return (
		<div className="parallax">
			<section className="section section-top">
				<div className="content rellax" data-rellax-speed="5">
					<h1>Community Based Driven Video</h1>
					<a href="#" className="btn-parallax btn-primary">
						Learn More
					</a>
				</div>
			</section>

			<section className="section section-stream">
				<img
					className="play rellax"
					src="https://i.ibb.co/TvdbMhQ/play-button.png"
					alt=""
					data-rellax-speed="-1"
					data-rellax-xs-speed="-5"
				/>
				<div className="content rellax" data-rellax-speed="10">
					<div>
						<h2 className="secondary-text">Stream Everything</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore et dicta consectetur incidunt omnis nam
							quis quidem nisi ipsa deserunt.
						</p>
					</div>
					<div>
						<h2 className="secondary-text">Short is the New Long</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore et dicta consectetur incidunt omnis nam
							quis quidem nisi ipsa deserunt.
						</p>
					</div>
				</div>
			</section>
			<section className="section section-grid">
				<div className="rellax" data-rellax-speed="1" data-rellax-xs-speed="3">
					<FaVideo className="fas fa-video fa-3x secondary-text" />
					<h2>
						Watch<span className="secondary-text dot">.</span>
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore et dicta consectetur incidunt omnis nam quis
						quidem nisi ipsa deserunt.
					</p>
				</div>
				<div className="rellax" data-rellax-speed="4" data-rellax-xs-speed="3">
					<FaUsers className="fas fa-users fa-3x secondary-text" />
					<h2>
						Share<span className="secondary-text dot">.</span>
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore et dicta consectetur incidunt omnis nam quis
						quidem nisi ipsa deserunt.
					</p>
				</div>
				<div className="rellax" data-rellax-speed="7" data-rellax-xs-speed="3">
					<FaBook className="fas fa-book fa-3x secondary-text" />
					<h2>
						Learn<span className="secondary-text dot">.</span>
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore et dicta consectetur incidunt omnis nam quis
						quidem nisi ipsa deserunt.
					</p>
				</div>
			</section>

			<footer className="footer">
				<ul>
					<li>
						<a href="#">Faq</a>
					</li>
					<li>
						<a href="#">Terms of Use</a>
					</li>
					<li>
						<a href="#">Privacy Notice</a>
					</li>
					<li>
						<a href="#">Contact Us</a>
					</li>
					<li>
						<a href="#">About Us</a>
					</li>
				</ul>
			</footer>
		</div>
	);
};

export default Loading(Parallax);
