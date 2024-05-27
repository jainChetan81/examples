import { useRef } from "react";
import useObserver from "../hooks/useObserver";
import "../styles/tailwind.css";
import { TextTypingEffectWithTexts } from "../components/TypingEffect";
import { NotifyButton } from "../components/Notification";

function App() {
	const ref = useRef<null | HTMLElement>(null);
	const { isIntersecting } = useObserver(ref, "-200px");

	return (
		<div className={`App ${isIntersecting ? "red" : ""}`}>
			<header>This is the Intersection Observer</header>
			<main style={{ height: "500px", background: "green" }} ref={ref}>
				<div className="child-one">Child One</div>
				<div className="child-two">Child Two</div>
			</main>
			<NotifyButton />
			<TextTypingEffectWithTexts />
		</div>
	);
}

export default App;
