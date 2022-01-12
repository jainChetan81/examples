/* eslint-disable no-restricted-globals */
import Head from "next/head";
import PropTypes from "prop-types";
import { FC } from "react";
import { LayoutType } from "../types";

const Home: FC<LayoutType> = ({ title, keywords, description, children }) => {
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
			<main>{children}</main>
		</>
	);
};
Home.defaultProps = {
	description: "A gallery of various Games",
	keywords: "",
};
Home.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	keywords: PropTypes.string,
};
export default Home;
