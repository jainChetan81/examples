import { FC, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import type { Planet, Planets as PlanetTypes } from "../../types";

const Planets: FC = () => {
	const [page, setPage] = useState(1);
	const fetchPlanets = async () => {
		const response: Response = await fetch("https://swapi.dev/api/planets?page=" + page);
		return response.json();
	};
	const { data, status }: UseQueryResult<PlanetTypes, string> = useQuery(["planets", page], fetchPlanets, {
		staleTime: 20000,
		cacheTime: 20000,
		onSuccess: (data) => console.log("no problem"),
	});
	return (
		<div>
			<h2>Planets</h2>
			<button onClick={() => setPage(1)}>page 1</button>
			<button onClick={() => setPage(2)}>page 2</button>
			<button onClick={() => setPage(3)}>page 3</button>
			{status === "error" && <p>Error fetching planets</p>}
			{status === "loading" && <p>Loading planets...</p>}
			{status === "success" && (
				<ul>
					{data?.results?.map((planet: Planet) => (
						<li className="card" key={planet.name}>
							<h3>{planet.name}</h3>
							<p>Population: {planet.population}</p>
							<p>Terrain: {planet.terrain}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Planets;
