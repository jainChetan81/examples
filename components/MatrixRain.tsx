import { FC, useEffect, useRef } from "react";
class SymbolCanvas {
	characters: string;
	fontSize: number;
	canvasHeight: any;
	text: string;
	x: number;
	y: number;
	constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
		this.characters =
			"アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.text = "";
		this.canvasHeight = canvasHeight;
	}
	draw(context: CanvasRenderingContext2D) {
		this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
		context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
		if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
			this.y = 0;
		} else {
			this.y += 1;
		}
	}
}

class Effect {
	fontSize: number;
	canvasWidth: number;
	canvasHeight: number;
	columns: number;
	symbols: SymbolCanvas[];
	constructor(canvasWidth: number, canvasHeight: number) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.fontSize = 25;
		this.columns = this.canvasWidth / this.fontSize;
		this.symbols = [];
		this.#initialize();
	}
	#initialize() {
		for (let i = 0; i < this.columns; i++) {
			this.symbols[i] = new SymbolCanvas(i, 0, this.fontSize, this.canvasHeight);
		}
	}
	resize(width: number, height: number) {
		this.canvasWidth = width;
		this.canvasHeight = height;
		this.columns = this.canvasWidth / this.fontSize;
		this.symbols = [];
		this.#initialize();
	}
}
const MatrixRain: FC<any> = () => {
	const ref = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		const canvas = ref.current!;
		const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
		canvas.width = +window.innerWidth;
		canvas.height = +window.innerHeight;

		const effect: Effect = new Effect(canvas.width, canvas.height);
		let lastTime: number = 0;
		const fps: number = 60;
		const nextFrame: number = 1000 / fps;
		let timer: number = 0;
		const animate = (timeStamp: number) => {
			const deltaTime: number = timeStamp - lastTime;
			lastTime = timeStamp;
			if (timer > nextFrame) {
				ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
				ctx.textAlign = "center";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = "#0affa0";
				ctx.font = effect.fontSize + "px monospace";
				effect.symbols.forEach((symbol: SymbolCanvas) => symbol.draw(ctx));
				timer = 0;
			} else {
				timer += deltaTime;
			}
			requestAnimationFrame(animate);
		};
		animate(0);
		window.addEventListener("resize", () => {
			canvas.width = +window.innerWidth;
			canvas.height = +window.innerHeight;
			effect.resize(canvas.width, canvas.height);
		});
		return () => {
			window.removeEventListener("resize", () => {
				canvas.width = +window.innerWidth;
				canvas.height = +window.innerHeight;
				effect.resize(canvas.width, canvas.height);
			});
		};
	}, []);

	return (
		<div className="matrix">
			<canvas ref={ref} id="canvas"></canvas>
		</div>
	);
};

export default MatrixRain;
