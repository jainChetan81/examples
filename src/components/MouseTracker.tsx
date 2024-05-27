import { type CSSProperties, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const style: CSSProperties = {
	position: "fixed",
	// @ts-expect-error something is wrong with the type of pointer-events
	"pointer-events": "none",
	visibility: "hidden"
};

type Props = {
	children: React.ReactNode;
	offset?: { x: number; y: number };
};
const MouseTracker = ({ children, offset = { x: 0, y: 0 } }: Props) => {
	const element = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		function handler(e: MouseEvent) {
			if (!element.current) return;
			const x = e.clientX + offset.x,
				y = e.clientY + offset.y;
			element.current.style.transform = `translate(${x}px, ${y}px)`;
			element.current.style.visibility = "visible";
		}
		function handlerMobile(ev: TouchEvent) {
			if (!element.current || ev.touches.length) return;
			const e = ev.touches[0]!;
			const x = e.clientX + offset.x,
				y = e.clientY + offset.y;
			element.current.style.transform = `translate(${x}px, ${y}px)`;
			element.current.style.visibility = "visible";
		}
		document.addEventListener("mousemove", handler);
		document.addEventListener("touchmove", handlerMobile);
		return () => {
			document.removeEventListener("mousemove", handler);
			document.removeEventListener("touchmove", handlerMobile);
		};
	}, [offset.x, offset.y]);
	if (typeof document === "undefined") return <> </>;
	return createPortal(
		<div style={style} ref={element}>
			{children}
		</div>,
		document.body
	);
};

export { MouseTracker };
