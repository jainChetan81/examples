import { Layout } from "../components";
import Loading from "../hoc/Loading";

const MobileCards = () => {
	return (
		<Layout title="Animated Cards With Mobile Fallback">
			<div className="animated--cards">
				<article className="card__animation">
					<div className="card__content">
						<h2>Something awesome</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptate corrupti delectus rerum eligendi
							iste fuga fugit unde amet et.
						</p>
						<a href="#" target="_blank" rel="noopener noreferrer">
							Learn More
						</a>
					</div>
				</article>
			</div>
		</Layout>
	);
};

export default Loading(MobileCards);
