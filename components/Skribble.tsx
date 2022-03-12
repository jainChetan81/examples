import React, { ChangeEvent, FC, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
type WordType = {
	word: string;
	score: string;
};
const Skribble: FC = () => {
	const [word, setWord] = useState("");
	const fetchWords = async () => {
		const response: Response = await fetch("https://api.datamuse.com/words?sp=" + word);
		return response.json();
	};
	const { data, status }: UseQueryResult<WordType[], string> = useQuery(["words", word], fetchWords, {
		staleTime: 20000,
		cacheTime: 20000,
		onSuccess: (data) => console.log("no problem"),
	});
	return (
		<>
			<div>
				<label htmlFor="word" className="block text-sm font-medium text-gray-700">
					Enter the word You want to search for
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="word"
						id="word"
						className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						placeholder="you@example.com"
						value={word}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
					/>
				</div>
				<p className="mt-2 text-sm text-gray-500" id="email-description">
					If the letter between the word is unknown use <em>?</em>{" "}
				</p>
			</div>
			{status === "error" && <p>Error fetching words</p>}
			{status === "loading" && <p>Loading Words...</p>}
			{status === "success" && (
				<ul>
					{data?.map((word: WordType) => (
						<li key={word.score}>
							<h3>{word.word}</h3>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default Skribble;
