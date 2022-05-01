import "../styles/normalize.css";
import "../styles/global.scss";
import "../styles/spinner.scss";
import "../styles/testing.scss";
import "../styles/parallax.scss";
import "../styles/dribble.scss";
import "../styles/react-query.scss";
import "../styles/mobile_cards.scss";
import "../styles/youtube_sidebar.scss";
import "../styles/skribble.scss";
import "../styles/portfolio.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

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
			}, 1000);
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

	return <>{loading ? <Loader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
