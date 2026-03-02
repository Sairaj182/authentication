/** @type {import('next').NextConfig} */
const nextConfig = {
	serverExternalPackages: ['sequelize', 'mysql2'],
	turbopack: {},
};

module.exports = nextConfig;