const path = require('path');
const nodeExternals = require('webpack-node-externals');
const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: distDir
  },
  resolve: {
    modules: [
      srcDir,
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  externals: [nodeExternals()]  
};