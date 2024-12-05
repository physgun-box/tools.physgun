/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    output: 'export',
    reactStrictMode: true,
    transpilePackages: ['antd'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.userapi.com'
            }
        ]
    },
    experimental: { optimizeCss: true, esmExternals: true, workerThreads: true, swcMinify: true },
    poweredByHeader: false,
}

module.exports = nextConfig