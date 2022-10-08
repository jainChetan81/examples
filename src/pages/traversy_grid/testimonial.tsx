import { NextPage } from "next";
import { Layout } from "../../components";

const Testimonial: NextPage = () => {
	return (
		<Layout title="Traversy | Grid Testimonial">
			<section className="testimonials">
				<div className="card card__bg--purple">
					<header className="card__header">
						<img src="https://doodleipsum.com/700/avatar-5" className="card__img" alt="avatar" />
						<div>
							<h3>Lorem, ipsum.</h3>
							<p>Chetan Jain</p>
						</div>
					</header>
					<p className="card__lead">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam totam placeat, eum ipsam ad, vero accusamus
						voluptatem voluptas consequatur illo deserunt necessitatibus quia animi consectetur saepe quisquam
						recusandae eligendi in? Id, non. Sed architecto impedit tenetur magni dolorum accusamus veniam assumenda
						optio a voluptate explicabo perferendis, quo quam voluptas quos?
					</p>
					<p className="card__quote">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, dolorem! Quod, repellat at iure pariatur
						saepe doloremque dolorum error voluptates ipsa, harum distinctio nostrum laborum molestiae tenetur dolore
						tempora. Impedit.
					</p>
				</div>
				<div className="card card__bg--gray-blue">
					<header className="card__header">
						<img src="https://doodleipsum.com/700/avatar-5" className="card__img" alt="avatar" />
						<div>
							<h3>Lorem, ipsum.</h3>
							<p>Chetan Jain</p>
						</div>
					</header>
					<p className="card__lead">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis at eligendi asperiores consequuntur, velit
						esse earum ad facere molestias distinctio?
					</p>
					<p className="card__quote">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, dolorem! Quod, repellat at iure pariatur
						saepe doloremque dolorum error voluptates ipsa, harum distinctio nostrum laborum molestiae tenetur dolore
						tempora. Impedit.
					</p>
				</div>
				<div className="card ">
					<header className="card__header">
						<img src="https://doodleipsum.com/700/avatar-5" className="card__img" alt="avatar" />
						<div>
							<h3>Lorem, ipsum.</h3>
							<p>Chetan Jain</p>
						</div>
					</header>
					<p className="card__lead">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis at eligendi asperiores consequuntur, velit
						esse earum ad facere molestias distinctio?
					</p>
					<p className="card__quote">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, dolorem! Quod, repellat at iure pariatur
						saepe doloremque dolorum error voluptates ipsa, harum distinctio nostrum laborum molestiae tenetur dolore
						tempora. Impedit.
					</p>
				</div>
				<div className="card card__bg--black-blue">
					<header className="card__header">
						<img src="https://doodleipsum.com/700/avatar-5" className="card__img" alt="avatar" />
						<div>
							<h3>Lorem, ipsum.</h3>
							<p>Chetan Jain</p>
						</div>
					</header>
					<p className="card__lead">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis at eligendi asperiores consequuntur, velit
						esse earum ad facere molestias distinctio?
					</p>
					<p className="card__quote">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, dolorem! Quod, repellat at iure pariatur
						saepe doloremque dolorum error voluptates ipsa, harum distinctio nostrum laborum molestiae tenetur dolore
						tempora. Impedit.
					</p>
				</div>
				<div className="card ">
					<header className="card__header">
						<img src="https://doodleipsum.com/700/avatar-5" className="card__img" alt="avatar" />
						<div>
							<h3>Lorem, ipsum.</h3>
							<p>Chetan Jain</p>
						</div>
					</header>
					<p className="card__lead">
						{" "}
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam eligendi illo perspiciatis provident
						explicabo expedita porro. Distinctio id nobis praesentium
					</p>
					<p className="card__quote">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas harum vel voluptate corporis veritatis qui?
					</p>
				</div>
			</section>
		</Layout>
	);
};

export default Testimonial;
