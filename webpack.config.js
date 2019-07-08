const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let isProduction = process.env.NODE_ENV === 'production';

let rootDir = path.resolve(__dirname, 'src');

/**
 * @type {import('webpack-dev-server').Configuration}
 */
let devServerConfig = {
  open: true,
  publicPath: '/',
  contentBase: path.resolve(__dirname, 'public'),
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
};

/**
 * @type {import('webpack').Configuration}
 */
let webpackConfig = {
  mode: isProduction ? 'production' : 'development',

  context: rootDir,

  entry: './main.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: devServerConfig.publicPath,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },

  devServer: devServerConfig,

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
};

module.exports = webpackConfig;
