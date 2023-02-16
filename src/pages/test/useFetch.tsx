import { useEffect, useState } from "react";

const useFetch = <T,>(url: string) => {
	const [data, setData] = useState<null | T>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown | null>(null);

	async function fetchData() {
		try {
			setLoading(true);
			const data = (await (await fetch(url)).json()).products as T;
			setData(data);
		} catch (error) {
			console.error(error);
			setError(error);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
