import { FC } from "react";

interface IAnimatedLettersProps {
	letterClass?: string;
	strArray: string[];
	idx: number;
}
const AnimatedLetters: FC<IAnimatedLettersProps> = ({ letterClass, strArray, idx }) => (
	<span>
		{strArray.map((char, i) => (
			<span key={char + i} className={`${letterClass} _${i + idx}`}>
				{char}
			</span>
		))}
	</span>
);

export default AnimatedLetters;
