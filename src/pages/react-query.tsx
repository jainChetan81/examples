import React, { useState } from "react";
import { Layout, Navbar, People, Planets } from "../components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const ReactQuery = () => {
	const [page, setPage] = useState<"planets" | "people">("planets");
	return (
		<Layout title="React Query | Net Ninja">
			<QueryClientProvider client={queryClient}>
				<section className="query">
					<h1>Star Wars App</h1>
					<Navbar setPage={setPage} />
					<div className="content">{page === "planets" ? <Planets /> : <People />}</div>
				</section>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Layout>
	);
};

export default ReactQuery;
