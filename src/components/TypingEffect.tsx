import { useEffect, useState } from "react";

export const useTypingEffect = (text: string[], duration: number) => {
	const [currPos, setCurrPos] = useState(0);

	useEffect(() => {
		if (text.length <= currPos) return;
		const intervalId = setInterval(() => setCurrPos((p) => p + 1), duration);
		return () => clearInterval(intervalId);
	}, [text, duration, currPos]);
	return text.slice(0, currPos).join("");
};

const texts = [
	"This is a simple text typing effect in React",
	"This effect is created using React Hooks",
	"We can use this effect to create a typing effect for our portfolio",
	"We can also use this effect to create a typing effect for our resume",
	"or for your blog",
	"or for your landing page",
	"let's go"
];

type TextTypingEffectProps = {
	duration?: number;
};

export const TextTypingEffectWithTexts: React.FC<TextTypingEffectProps> = ({ duration = 200 }) => {
	const [textIndex, setTextIndex] = useState(0);
	const textToShow = useTypingEffect(texts[textIndex]!.split(""), duration);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTextIndex((prevIndex) => (prevIndex >= texts.length - 1 ? 0 : prevIndex + 1));
		}, 5000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<span className="text-black " key={textIndex}>
			{textToShow}
		</span>
	);
};
