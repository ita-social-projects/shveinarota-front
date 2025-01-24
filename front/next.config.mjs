/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost', 'lh3.googleusercontent.com', 'shveya.onrender.com'], // Укажите домены, которые можно использовать
	},
	env: {
		BACK_URL: process.env.BACK_URL,
		CLIENT_ID: process.env.CLIENT_ID,
		DISCOVERY_DOCS: process.env.DISCOVERY_DOCS,
		SCOPES: process.env.SCOPES
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
