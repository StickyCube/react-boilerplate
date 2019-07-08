const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.js');

/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = {
  ...config,

  entry: './examples/main.jsx',

  output: {
    ...config.output,
    filename: '[name].[hash].bundle.js',
  },

  devServer: {
    open: true,
    publicPath: '/',
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: false,
      timings: true,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'examples/index.template.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
};

module.exports = webpackConfig;
