import { useEffect, useState, useDebugValue, useRef } from "react";
export default function useFetch<T extends any>(url: string, method: "GET" | "POST" = "GET", body: any = null) {
	type FETCH_RESPONSE = {
		status: boolean;
	} & { [x: string]: T };

	const [numberOfRefetch, setNumberOfRefetch] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown | null>(null);
	const [data, setData] = useState<FETCH_RESPONSE>({} as FETCH_RESPONSE);
	const controllerRef = useRef<AbortController | null>();
	useDebugValue([data, loading, error]);
	const refetch = () => setNumberOfRefetch((prev) => prev + 1);

	useEffect(() => {
		let isCancelled = false;
		const fetchData = async () => {
			if (controllerRef.current) controllerRef.current.abort();
			const controller = new AbortController();
			controllerRef.current = controller;
			if (!url || isCancelled) return;
			setLoading(true);
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${url}`, {
					signal: controllerRef.current?.signal,
					credentials: "include",
					method,
					body,
				});
				const newData = (await response.json()) as FETCH_RESPONSE;
				if (!isCancelled) {
					setData({ ...newData });
					setError(null);
					controllerRef.current = null;
				}
			} catch (e: any) {
				setError(e);
			}
			setLoading(false);
		};
		if (!url.includes("undefined")) fetchData();
		return () => {
			isCancelled = true;
			controllerRef.current?.abort();
		};
	}, [body, method, url, numberOfRefetch]);

	return { data, loading, error, refetch };
}
