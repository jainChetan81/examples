import { Layout } from "../components";

const TiltingCards = () => {
	return (
		<Layout title="Tilting Cards with CSS">
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
		</Layout>
	);
};

export default TiltingCards;
