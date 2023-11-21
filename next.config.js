/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,//false to prevent double render
  swcMinify: false,
  images:{
      domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
