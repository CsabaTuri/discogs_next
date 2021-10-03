const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "@storybook/addon-contexts/register",
    "@storybook/addon-docs",
    "storybook-addon-i18n",
    "storybook-react-i18next",
    "storybook-addon-next-router",
    "storybook-addon-styled-component-theme/dist/preset",
  ],
  webpackFinal: async (baseConfig) => {
    const nextConfig = require("../next.config.js");
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      fs: path.resolve(__dirname, "fsMock.js"),
    };
    // merge whatever from nextConfig into the webpack config storybook will use
    return { ...baseConfig };
  },
  reactOptions: {
    fastRefresh: true,
  },
};
