import "../styles/normalize.css";
import "../styles/global.scss";
import "../styles/spinner.scss";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const handleRouteChange = (url: string, { shallow }) => {
			if (!shallow) {
				setLoading(true);
				console.log(`App IS CHANGING to ${url} ${shallow ? "with" : "without"} shallow routing`);
			}
		};
		const handleRouteComplete = (url: string, { shallow }) => {
			setTimeout(() => {
				// if (!shallow) {
				setLoading(false);
				// console.log(`App HAS CHANGED to ${url} ${shallow ? "with" : "without"} shallow routing`);
				// }
			}, 3000);
		};
		const handleRouteChangeError = (err, url: string) => {
			if (err.cancelled) {
				console.log(`Route to ${url} was cancelled!`);
			}
		};

		router.events.on("routeChangeStart", handleRouteChange);
		router.events.on("routeChangeComplete", handleRouteComplete);
		router.events.on("routeChangeError", handleRouteChangeError);
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
			router.events.off("routeChangeComplete", handleRouteComplete);
			router.events.off("routeChangeError", handleRouteChangeError);
		};
	});

	return <>{loading ? <Loader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
