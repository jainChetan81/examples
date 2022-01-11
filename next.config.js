/** @type {import('next').NextConfig} */
const path = require("path");
const withSass = require("@zeit/next-sass");
module.exports = withSass({ cssModules: true });
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	sassOptions: { includePaths: [path.join(__dirname, "styles")] },
	images: {
		domains: ["res.imagekit.io", "ik.imagekit.io"],
		minimumCacheTTL: 3600,
		disableStaticImages: true,
	},
};
