/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.ignoreWarnings = [{ module: /punycode/ }]
        return config
    }
};
export default nextConfig;
