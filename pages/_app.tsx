import "../styles/normalize.css";
import "../styles/global.scss";
import "../styles/spinner.scss";
import "../styles/testing.scss";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader, MatrixRain } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [display, setDisplay] = useState<boolean>(false);

	useEffect(() => {
		const handleRouteChange = (url: string, { shallow }: any) => {
			if (!shallow) {
				setLoading(true);
			}
		};
		const handleRouteComplete = (url: string, { shallow }: any) => {
			setTimeout(() => {
				if (!shallow) {
					setLoading(false);
				}
			}, 3000);
		};
		const handleRouteChangeError = (err: any, url: string) => {
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
	}, [router]);

	useEffect(() => {
		setDisplay(true);
		setTimeout(() => {
			setDisplay(false);
		}, 3000);
	}, []);

	return <>{loading ? <Loader /> : <div>{display ? <MatrixRain /> : <Component {...pageProps} />}</div>}</>;
}

export default MyApp;
