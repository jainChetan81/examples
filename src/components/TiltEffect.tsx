import { useState } from "react";

function throttle<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void {
	let last = 0;
	return (...args: unknown[]) => {
		const now = new Date().getTime();
		if (now - last < delay) return;
		last = now;
		return fn(...args);
	};
}
export const TiltEffect = () => {
	const [rotate, setRotate] = useState({ x: 0, y: 0 });
	const onMouseLeave = () => {
		setRotate({ x: 0, y: 0 });
	};
	const onMouseMove = throttle((e: any) => {
		const card = e.currentTarget;
		const box = card.getBoundingClientRect();
		const x = e.clientX - box.left;
		const y = e.clientY - box.top;
		const centerX = box.width / 2;
		const centerY = box.height / 2;
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;

		setRotate({ x: rotateX, y: rotateY });
	}, 100);

	return (
		<>
			<div
				className="card relative m-56 h-96 w-96 rounded-xl bg-white transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				style={{
					transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
					transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s"
				}}>
				<div className="pulse absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-75 blur-xl" />
				<div className="relative flex h-full w-full select-none items-center justify-center rounded-lg bg-slate-900 text-sm font-light text-slate-300">
					hover me
				</div>
			</div>
		</>
	);
};
