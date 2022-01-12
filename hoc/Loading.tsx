import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Loading = (WrappedComponent: any) => {
	function HOC(props: any): JSX.Element {
		const router: NextRouter = useRouter();

		const [isLoading, setIsLoading] = useState<boolean>(false);

		useEffect(() => {
			const handleStart = (url: string) => {
				// if (url === router.asPath) {
				// setIsLoading(true);
				// console.log("starting");
				// }
			};
			const handleComplete = (url: string) => {
				// if (url === router.asPath) {
				// setIsLoading(false);
				// console.log("ended");
				// }
			};

			router.events.on("routeChangeStart", handleStart);
			router.events.on("routeChangeComplete", handleComplete);
			router.events.on("routeChangeError", handleComplete);

			return () => {
				router.events.off("routeChangeStart", handleStart);
				router.events.off("routeChangeComplete", handleComplete);
				router.events.off("routeChangeError", handleComplete);
			};
		});

		return (
			<>
				<WrappedComponent {...props} />
			</>
		);
		// return <Loader />;
	}
	return HOC;
};
export default Loading;
