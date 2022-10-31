import Loading from "../hoc/Loading";
import { Layout } from "../components";
import { NextPage } from "next";
import Image from "next/image";

const Dribble: NextPage = () => {
	return (
		<Layout title="Dribble Card design">
			<div className="fancy-card-grid">
				{[0, 1, 2, 3].map((item, index) => {
					return (
						<a href="#" className="fancy-card" key={index}>
							<span className="fancy-card__number" aria-hidden={true}>
								/ 1
							</span>
							<h2 className="fancy-card__title">Device Mockups</h2>
							<span className="fancy-card__arrow" aria-hidden="true">
								&#8594;
							</span>
							<Image
								className="fancy-card__image"
								src="https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-0.jpg?tr=w-100,h-100"
								height={100}
								width={100}
								alt={index + "side"}
							/>
							<Image
								className="fancy-card__image"
								src="https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-1.jpg?tr=w-100,h-100"
								height={100}
								width={100}
								alt={index + "side"}
							/>
							<Image
								className="fancy-card__image"
								src="https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-2.jpg?tr=w-100,h-100"
								height={100}
								width={100}
								alt={index + "side"}
							/>
							<Image
								className="fancy-card__image"
								src="https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-3.jpg?tr=w-100,h-100"
								height={100}
								width={100}
								alt={index + "side"}
							/>
							<Image
								className="fancy-card__image"
								src="https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-4.jpg?tr=w-100,h-100"
								alt={index + "side"}
								height={100}
								width={100}
							/>
							<Image
								className="fancy-card__image"
								src="https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-5.jpg?tr=w-100,h-100"
								alt={index + "side"}
								height={100}
								width={100}
							/>
						</a>
					);
				})}
			</div>
		</Layout>
	);
};

export default Loading(Dribble);
