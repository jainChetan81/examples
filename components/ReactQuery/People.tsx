import { FC, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { People as PeopleType, Person } from "../../types";

const People: FC = () => {
	const [page, setPage] = useState(1);
	const fetchPeople = async (): Promise<PeopleType> => {
		const response: Response = await fetch("https://swapi.dev/api/people/?page=" + page);
		return response.json();
	};
	const { data, isPreviousData, status }: UseQueryResult<PeopleType, string> = useQuery(
		["people", page],
		fetchPeople,
		{ keepPreviousData: true }
	);
	return (
		<div>
			<h2>People</h2>
			<button onClick={() => setPage(1)}>page 1</button>
			<button onClick={() => setPage(2)}>page 2</button>
			<button onClick={() => setPage(3)}>page 3</button>
			{status === "error" && <p>Error fetching people</p>}
			{status === "loading" && <p>Loading people...</p>}
			{status === "success" && (
				<ul>
					{data?.results?.map((person: Person) => (
						<li className="card" key={person.name}>
							<h3>{person.name}</h3>
							<p>Gender: {person.gender}</p>
							<p>Birth Year: {person.birth_year}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default People;
