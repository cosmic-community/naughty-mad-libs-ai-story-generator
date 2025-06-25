/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgix.cosmicjs.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig