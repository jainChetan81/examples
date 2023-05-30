import { useEffect, useRef } from "react";

function useTraceUpdate<T extends Record<string, any>>(props: T, name: string) {
	const prev = useRef<T>(props);
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps: Record<string, any>, [k, v]) => {
			if (prev.current[k] !== v) {
				ps[k] = [prev.current[k], v];
			}
			return ps;
		}, {});
		if (Object.keys(changedProps).length > 0) {
			console.log(`${name} Changed props:`, changedProps);
		}
		prev.current = props;
	}, [props, name]);
}
export default useTraceUpdate;
