import { FC, useEffect, useState } from "react";
import { Characters } from "../types";

const Characters: FC = () => {
	const [characters, setCharacters] = useState<Characters | []>([]);
	const fetchCharacters = async (): Promise<void> => {
		const response: Response = await fetch("https://rickandmortyapi.com/api/character");
		if (response.ok) {
			const json = await response.json();
			setCharacters(json.results);
		}
	};
	useEffect(() => {
		fetchCharacters();
	}, []);
	return <div></div>;
};

export default Characters;
