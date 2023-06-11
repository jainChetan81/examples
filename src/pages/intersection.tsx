import { useEffect, useRef } from "react";
import useObserver from "../hooks/useObserver";


function App() {
    const ref = useRef<null | HTMLElement>(null);
    const { isIntersecting } = useObserver(ref, "-200px");
    useEffect(() => {
        if (!ref?.current) return
        if (isIntersecting) {
            ref.current.querySelectorAll("div").forEach((el) => {
                el.classList.add("slide-in");
            });
        } else {
            ref.current.querySelectorAll("div").forEach((el) => {
                el.classList.remove("slide-in");
            });
        }
    }, [isIntersecting]);

    return (
        <div className="App">
            <header>This is the Header</header>
            <main ref={ref}>
                <div className="child-one">Child One</div>
                <div className="child-two">Child Two</div>
            </main>
            <footer>This is the Footer</footer>
        </div>
    );
}

export default App;