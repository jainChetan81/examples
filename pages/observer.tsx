import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Layout } from "../components";

function useOnScreen(options: IntersectionObserverInit) {
	const ref = useRef();
	const [visible, setVisible] = useState<boolean>(false);
	const observer: IntersectionObserver = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
		setVisible(entry.isIntersecting);
	}, options);

	useEffect(() => {}, [ref, options]);
}

const Observer: NextPage = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState<boolean>(false);
	return (
		<Layout title="Intersection Observer">
			<div style={{ height: "100vh" }}>
				<h1>
					Scroll down to next section
					<span role="img" aria-label="pointing down">
						👇
					</span>
				</h1>
			</div>
			<div ref={ref} style={{ height: "100vh", backgroundColor: visible ? "#23cebd" : "#efefef" }}>
				{visible ? (
					<div>
						<h1>Hey I am on Screen</h1>
						<img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" alt="down image" />
					</div>
				) : (
					<h1>
						Scroll down 300px form the top of this section
						<span role="img" aria-label="pointing down">
							👇
						</span>
					</h1>
				)}
			</div>
		</Layout>
	);
};

export default Observer;
