// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));
/** @type {import("next").NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configuration = {
	swcMinify: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	reactStrictMode: true,
	sassOptions: { includePaths: [path.join(__dirname, "styles")] },
	images: {
		domains: ["res.imagekit.io", "ik.imagekit.io", "rickandmortyapi.com", "i.giphy.com"],
		minimumCacheTTL: 3600,
	},
	/**
	 * @param {{ module: { rules: { test: RegExp[]; sideEffects: boolean; }[]; }; }} config
	 */
	webpack(config) {
		config.module.rules.push({
			test: [/(src|components|api|constants|schema|utils|hooks|server|pages|hoc|types)\/index.ts/i],
			sideEffects: false,
		});
		return config;
	},
};
export default configuration;
