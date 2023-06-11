import { type MutableRefObject, useEffect, useState } from "react";

const useObserver = (ref: MutableRefObject<HTMLElement | null>, rootMargin: `${number}px`) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (!ref?.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) setIsIntersecting(entry.isIntersecting);
            },
            { rootMargin }
        );
        console.log(isIntersecting);
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [isIntersecting, ref, rootMargin]);


    return { isIntersecting }
}

export default useObserver