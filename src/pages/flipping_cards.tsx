import { Layout } from "../components";

const FlippingCards = () => {
	return (
		<Layout title="Flipping Cards">
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
		</Layout>
	);
};

export default FlippingCards;
