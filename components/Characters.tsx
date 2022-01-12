import Image from "next/image";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import type { Characters as CharactersTypes } from "../types";

const Characters: FC = () => {
	const [page, setPage] = useState<number>(1);
	const fetchCharacters = async () => {
		const response: Response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
		return response.json();
	};
	const { data, status, isPreviousData } = useQuery<
		{
			results: CharactersTypes[];
			info: {
				count: number;
				pages: number;
				next: string | null;
				prev: string | null;
			};
		},
		Error
	>(`characters${page}`, fetchCharacters, { keepPreviousData: true });
	if (status === "loading") {
		return <p>Loading...</p>;
	}
	if (status === "error") {
		return <p>Error</p>;
	}
	return (
		<div className="rick">
			{data &&
				data?.results.length > 0 &&
				data?.results.map((character: CharactersTypes) => {
					return (
						<div key={character.id} className="card">
							<h2>{character.name}</h2>
							<Image width={250} height={250} src={character.image} alt={character.name} />
							<p>
								{character.status} - {character.species}
							</p>
							<p>Last seen on {character.location.name}</p>
						</div>
					);
				})}
			<div>
				<button disabled={page === 1} onClick={() => setPage((page) => page - 1)}>
					previous
				</button>
				<button disabled={isPreviousData && !data?.info.next} onClick={() => setPage((page) => page + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Characters;
