/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost', 'lh3.googleusercontent.com', 'shveya.onrender.com'], // Укажите домены, которые можно использовать
	},
	env: {
		BACK_URL: process.env.BACK_URL,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
