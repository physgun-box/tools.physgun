/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'standalone',
    output: "standalone",
    transpilePackages: ['antd'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.userapi.com'
            }
        ]
    },
    experimental: { optimizeCss: true, esmExternals: true, workerThreads: false },
    poweredByHeader: false,
}

module.exports = nextConfig