/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
	reactStrictMode: true,
	sassOptions: { includePaths: [path.join(__dirname, "styles")] },
	images: {
		domains: ["res.imagekit.io", "ik.imagekit.io", "rickandmortyapi.com", "i.giphy.com"],
		minimumCacheTTL: 3600,
	},
	webpack(config) {
		config.module.rules.push({
			test: [/(components|api|constants|schema|utils)\/index.ts/i],
			sideEffects: false,
		});
		return config;
	},
	swcMinify: true,
};
