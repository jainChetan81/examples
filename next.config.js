/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	sassOptions: { includePaths: [path.join(__dirname, "styles")] },
	images: {
		domains: ["res.imagekit.io", "ik.imagekit.io", "rickandmortyapi.com", "i.giphy.com"],
		minimumCacheTTL: 3600,
		disableStaticImages: true,
	},
};
