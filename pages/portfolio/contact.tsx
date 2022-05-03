import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatedLetters, Layout } from "../../components/Portfolio";

const Contact = () => {
	const [letterClass, setLetterClass] = useState("text-animate");
	const form: any = useRef(null);
	const sendEmail = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form.current);
	};
	useEffect(() => {
		setTimeout(() => {
			setLetterClass("text-animate-hover");
		}, 3000);
	}, []);
	return (
		<Layout title="Portfolio | Contact">
			<div className="container contact-page">
				<div className="text-zone">
					<h1>
						<AnimatedLetters letterClass={letterClass} strArray={"Contact Me".split("")} idx={15} />
					</h1>
					<p>
						I am interested in freelance opportunities - especially ambitious or large projects. However, if
						you have other request or question, don&apos;t hesitate to contact me using below form either.
					</p>
					<div className="contact-form">
						<form ref={form} onSubmit={sendEmail}>
							<ul>
								<li className="half">
									<input placeholder="Name" type="text" name="name" required />
								</li>
								<li className="half">
									<input placeholder="Email" type="email" name="email" required />
								</li>
								<li>
									<input placeholder="Subject" type="text" name="subject" required />
								</li>
								<li>
									<textarea placeholder="Message" name="message" required></textarea>
								</li>
								<li>
									<input type="submit" className="flat-button" value="SEND" />
								</li>
							</ul>
						</form>
					</div>
				</div>
				<div className="info-map">
					Slobodan Gajić,
					<br />
					Serbia,
					<br />
					Branka RadiČevića 19, 22000 <br />
					Sremska Mitrovica <br />
					<br />
					<span>freelancerslobodan@gmail.com</span>
				</div>
				<div className="map-wrap">
					{/* <MapContainer center={[44.96366, 19.61045]} zoom={13}>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker position={[44.96366, 19.61045]}>
							<Popup>Sloba lives here, come over for a cup of coffee :)</Popup>
						</Marker>
					</MapContainer> */}
				</div>
			</div>
			{/* <Loader active type="pacman" /> */}
		</Layout>
	);
};

export default Contact;
