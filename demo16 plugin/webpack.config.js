const path = require('path')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyrightWebpackPlugin({
      name: 'xyz'
    })
  ]
}