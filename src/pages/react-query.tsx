import { NextPage } from "next";
import React, { useState } from "react";
import { Layout, Navbar, People, Planets } from "../components";
import { ReactQueryDevtools } from  "@tanstack/react-query-devtools";
const ReactQuery: NextPage = () => {
	const [page, setPage] = useState<string>("planets");
	return (
		<Layout title="React Query | Net Ninja">
			<section className="query">
				<h1>Star Wars App</h1>
				<Navbar setPage={setPage} />
				<div className="content">{page === "planets" ? <Planets /> : <People />}</div>
			</section>
			<ReactQueryDevtools initialIsOpen={false} />
		</Layout>
	);
};

export default ReactQuery;
