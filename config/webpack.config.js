/* eslint-disable */
const fs = require('fs');
const path = require('path')
const webpack = require('webpack')

const VENDOR_LIBS = [
  'lodash',
  'react',
  'prop-types',
  'react-redux',
  'socket.io-client',
];


const babelExclude = /node_modules/
const outputPath = path.join(__dirname, '..');

const config = {
  entry: {
    index: [path.join(__dirname, '../src', 'index.js')],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: babelExclude,
      },
    ],
  },
  // node: {
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty',
  //   rc: 'empty',
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: /^(lodash(\/.*)|redux|react-redux|react|prop-types|socket.io-client)$/,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
  ],
  target: 'web',
};

// PROD ONLY
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
  );
}
module.exports = config
