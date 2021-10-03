const { i18n } = require("./next-i18next.config");
const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript({
  experimental: {
    scrollRestoration: true,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    config.node = {
      fs: "empty",
    };
    return config;
  },
  images: {
    domains: ["img.discogs.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  distDir: "build",
  env: {
    HOST: process.env.HOST,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    BASE_URL: process.env.BASE_URL,
  },
  i18n,
  webpack5: false,
});
