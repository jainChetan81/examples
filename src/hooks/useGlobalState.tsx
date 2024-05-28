import { store } from "./store";
import { useEffect, useState } from "react";

interface UseGlobalStateProps<T> {
	shareKey: string;
	initialState?: T;
	onStateUpdated?: (data: T) => void;
}

export function useGlobalState<T>({ initialState, onStateUpdated, shareKey }: UseGlobalStateProps<T>) {
	const [state, setState] = useState<T>(initialState as T);

	useEffect(() => {
		const handleStateUpdate = (data: T) => {
			setState(data);
			onStateUpdated?.(data);
		};
		store.subscribe(shareKey, handleStateUpdate);
		return () => store.unsubscribe(shareKey, handleStateUpdate);
	}, [shareKey]);

	const setSharedState = (data: T) => store.emit(shareKey, data);

	return [state, setSharedState] as [T, (data: T) => void];
}
