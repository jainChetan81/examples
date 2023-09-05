import { useEffect, useRef } from "react";

const useWhyDidYouUpdate = <TProps extends Record<string, never>>(name: string, props: TProps) => {
    const previousProps = useRef<TProps | null>(props);
    useEffect(() => {
        if (!previousProps.current) return;
        if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const changesObj: any = {};
            allKeys.forEach((key) => {
                if (typeof previousProps.current![key] === "function" && typeof props[key] === "function") return;
                if (typeof previousProps.current![key] === "object" && typeof props[key] === "object") {
                    if (JSON.stringify(previousProps.current![key]) === JSON.stringify(props[key])) return;
                    changesObj[key] = {
                        from: previousProps.current![key],
                        to: props[key],
                    };
                    return;
                }

                if (previousProps.current![key] !== props[key]) {
                    changesObj[key] = {
                        from: previousProps.current![key],
                        to: props[key],
                    };
                }
            });
            if (Object.keys(changesObj).length) {
                console.log("[why-did-you-update]", name, changesObj);
            }
        }
        previousProps.current = props;
    });

}
export default useWhyDidYouUpdate;