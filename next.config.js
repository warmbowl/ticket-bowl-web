const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  target: 'serverless',
  webpack(config, options) {
    config.module = {
      ...(config.module || []),
    };

    config.plugins = [
      ...(config.plugins || []),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      }),
    ];

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsConfigPathsPlugin(),
    ];

    return config;
  },
};

module.exports = config;