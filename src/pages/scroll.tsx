import { TiltEffect } from "../components/TiltEffect";
import { Layout } from "../components";

export default function Scroll() {
	return (
		<Layout title="Scroll">
			<div className="w-full h-full flex place-content-center">
				<TiltEffect />
			</div>
		</Layout>
	);
}
