/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "reactflow/dist/base.css";
import { Loader } from "../components";
import "../styles/flipping_cards.scss";
import "../styles/forms.scss";
import "../styles/global.scss";
import "../styles/mobile_cards.scss";
import "../styles/normalize.css";
import "../styles/org-heirarchy.scss";
import "../styles/portfolio.scss";
import "../styles/react-select.scss";
import "../styles/spinner.scss";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: any) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const handleRouteChange = (url: string, { shallow }: { shallow: unknown }) => {
			if (!shallow) setLoading(true);
		};
		const handleRouteComplete = (url: string, { shallow }: { shallow: unknown }) => {
			setTimeout(() => {
				if (!shallow) setLoading(false);
			}, 1000);
		};
		const handleRouteChangeError = (err: any, url: string) => {
			if (err?.cancelled) console.log(`Route to ${url} was cancelled!`);
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
