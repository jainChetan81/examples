import { TiltEffect } from "../components/TiltEffect";
import "../styles/tailwind.css";

export default function Scroll() {
	return (
		<div className="w-full h-full flex place-content-center">
			<TiltEffect />
		</div>
	);
}
