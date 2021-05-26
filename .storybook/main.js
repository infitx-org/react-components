const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx','../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
  ],
  webpackFinal: async (config, { configType }) => {

    // Allow absolute paths
    config.resolve.modules = [path.resolve(__dirname, '../src'), 'node_modules'];

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src'),
    });

    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.unshift({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgoConfig: {
          plugins: {
            removeViewBox: false
          }
        }
      }
    });

    return config;
  },
};