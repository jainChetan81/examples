import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
type WordType = {
	word: string;
	score: string;
};
const Skribble: FC = () => {
	const [word, setWord] = useState("");
	const [wordCount, setWordCount] = useState(1);
	const fetchWords = async () => {
		const response: Response = await fetch("https://api.datamuse.com/words?sp=" + word);
		return response.json();
	};
	const { data, status }: UseQueryResult<WordType[], string> = useQuery(["words", word], fetchWords, {
		staleTime: 20000,
		cacheTime: 20000,
	});
	const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
		// replace whitespace with a character that is not a whitespace
		setWord(e.target.value.replace(/\s/g, "?"));
		// ensure word count remains greater than zero
		setWordCount(e.target.value.length > 1 ? e.target.value.length : 1);
	};
	return (
		<>
			<div>
				<label htmlFor="word" className="block text-sm font-medium text-gray-700">
					Enter the word You want to search for
				</label>
				<div className="mt-1">
					<div className="divOuter" style={{ width: `${3 * wordCount}rem` }}>
						<div>
							<input className="partitioned" type="text" value={word} onChange={handleWordChange} />
						</div>
					</div>
				</div>
				<p className="mt-2 text-sm text-gray-500">
					Press
					<em>
						<strong> Space </strong>
					</em>
					to increase word count and fill up unknown word
				</p>
				<p className="mt-2 text-sm text-gray-500">
					The letter <strong>?</strong> indicates unknown letter
				</p>
			</div>
			{status === "error" && <p>Error fetching words</p>}
			{status === "loading" && <p>Loading Words...</p>}
			{status === "success" && (
				<ul>
					{data?.map((word: WordType) => (
						<li key={word.word}>
							<h3>{word.word}</h3>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default Skribble;
