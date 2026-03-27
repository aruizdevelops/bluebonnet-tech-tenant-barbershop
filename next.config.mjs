import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/bluebonnet-tech-tenant-barbershop',
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@bluebonnet-tech/core'],
  webpack: (config) => {
    const resolve = (pkg) => path.resolve(__dirname, 'node_modules', pkg);
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/icons-material': resolve('@mui/icons-material'),
      '@mui/material': resolve('@mui/material'),
      '@mui/system': resolve('@mui/system'),
      '@mui/styled-engine': resolve('@mui/styled-engine'),
      '@mui/private-theming': resolve('@mui/private-theming'),
      '@mui/utils': resolve('@mui/utils'),
      '@emotion/react': resolve('@emotion/react'),
      '@emotion/styled': resolve('@emotion/styled'),
      '@emotion/cache': resolve('@emotion/cache'),
    };
    return config;
  },
};

export default nextConfig;
