const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
let webpackConfig = {
  context: __dirname,

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
};

module.exports = webpackConfig;
