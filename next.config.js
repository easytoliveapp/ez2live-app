/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		typedRoutes: true,
		scrollRestoration: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "ez2live.s3.us-east-1.amazonaws.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*",
				port: "",
				pathname: "/**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/app",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
