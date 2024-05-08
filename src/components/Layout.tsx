/* eslint-disable no-restricted-globals */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import type { FC } from "react";
import type { LayoutType } from "../types";

const Home: FC<LayoutType> = ({ title, keywords, description, children }) => {
	const queryClient = new QueryClient();
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="manifest" href="manifest.json" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<main>{children}</main>
			</QueryClientProvider>
		</>
	);
};
export default Home;
