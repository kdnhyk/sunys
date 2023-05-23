/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  //
  rewrites: {
    source: "/v1/nid/me", // url이 source에 해당될 경우
    destination: "https://openapi.naver.com/v1/nid/me", // destination으로 redirect
  },
};

module.exports = nextConfig;
