const config = require('./webpack.config.js');

/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = {
  ...config,

  mode: 'production',

  output: {
    ...config.output,
    libraryTarget: 'umd',
    library: 'foo',
    filename: 'foo.js',
  },

  externals: [
    {
      react: 'react',
    },
  ],
};

module.exports = webpackConfig;
