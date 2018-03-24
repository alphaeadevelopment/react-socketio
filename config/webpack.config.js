/* eslint-disable */
const fs = require('fs');
const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json');

// const VENDOR_LIBS = [
//   'lodash',
//   'react',
//   'prop-types',
//   'react-redux',
//   'socket.io-client',
// ];

const babelExclude = /node_modules/
const outputPath = path.join(__dirname, '..');

const config = {
  entry: {
    main: path.join(__dirname, '../src', 'index.js'),
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    // library: ["SocketProvider"],
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
  externals: {
    react: 'react'
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor', 'manifest'],
    // }),
  ]
};

// PROD ONLY
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
  );
}
module.exports = config
