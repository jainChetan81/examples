import { Layout } from "../components";

const CssCards = () => {
	return (
		<Layout title="Different CSS Cards">
			<div className="css__cards">
				<section className="flipping_container">
					<div className="card">
						<div className="card__content">
							<div className="card__front">
								<h3>The Fair</h3>
								<p>Time for some Fun!</p>
							</div>
							<div className="card__back">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, omnis?</p>
							</div>
						</div>
					</div>
				</section>
				<div className="animated--cards">
					<article className="card__animation">
						<div className="card__content">
							<h2>Something awesome</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptate corrupti delectus rerum eligendi iste fuga fugit
								unde amet et.
							</p>
							<a href="#" target="_blank" rel="noopener noreferrer">
								Learn More
							</a>
						</div>
					</article>
				</div>
				<section className="tilting_cards-container">
					<div className="tilting_cards-wrapper">
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="mouse_position-tracker"></div>
						<div className="tilting_card-content">
							<h1>Tilting Card</h1>
							<p>CSS Only</p>
						</div>
					</div>
				</section>
				<section className="toggle_buttons">
					<input type="checkbox" id="check" className="toggle" />
					<label htmlFor="check">Checked?</label>
					<input type="checkbox" disabled id="check-disabled" className="toggle" />
					<label htmlFor="check-disabled">Disabled</label>
				</section>
				<section className="twitch__cards">
					<div className="actual__card">
						<div className="actual__card-content">
							<h3 className="actual__card-title">I know exactly what I`&apos;`m doing</h3>
							<h4 className="actual__card-subtitle"></h4>
						</div>
						<i className="fa-solid fa-hat-witch actual__card-icon"></i>
					</div>

					<a id="source-link" className="meta-link" href="https://brand.twitch.tv" target="_blank" rel="noreferrer">
						<i className="fa-solid fa-link"></i>
						<span className="roboto-mono">Source</span>
					</a>

					<a id="yt-link" className="meta-link" href="https://youtu.be/joDhIH6Xumw" target="_blank" rel="noreferrer">
						<i className="fa-brands fa-youtube"></i>
						<span>3 min tutorial</span>
					</a>
				</section>
			</div>
		</Layout>
	);
};

export default CssCards;
