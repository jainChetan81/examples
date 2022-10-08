import { useEffect } from "react";
import Tesseract from "tesseract.js";
import { Layout } from "../components";

const Audio = () => {
	async function setup(video: HTMLVideoElement | null) {
		if (!video) return;
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		video.srcObject = stream;
	}
	async function worker(this: HTMLVideoElement | null) {
		const worker = Tesseract.createWorker();
		await worker.load();
		await worker.loadLanguage("eng");
		await worker.initialize("eng");

		const canvas = document.createElement("canvas");
		canvas.width = this?.width as number;

		document.addEventListener("keypress", (e) => {
			if (e.code !== "Space") return;
			canvas
				.getContext("2d")
				?.drawImage(this as CanvasImageSource, 0, 0, this?.width as number, this?.height as number);
			worker.recognize(canvas).then((result) => {
				console.log("result:", result.data.text);
			});
		});
	}
	useEffect(() => {
		const video = document.querySelector("video");
		setup(video);
		video?.addEventListener("playing", worker);
		return () => {
			video?.removeEventListener("playing", worker);
		};
	}, []);

	return (
		<Layout title="Audio Book Reader">
			<video width={720} height={560} autoPlay muted></video>
			<pre data-text style={{ fontSize: "2rem", width: "100%", whiteSpace: "pre-wrap", fontFamily: "inherit" }}></pre>
		</Layout>
	);
};

export default Audio;
