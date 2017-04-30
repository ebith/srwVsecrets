const path = require('path');
const babili = require('babili-webpack-plugin');
const html = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dest')
  },
  plugins: [
    new html({ template: './src/index.pug' }),
  ],
  module: {
    rules: [
      { test: /\.pug$/, use: 'pug-loader' },
      { test: /\.js$/, use: ['eslint-loader'], enforce: 'pre'},
      { test: /\.js$/, use: ['babel-loader']},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
    ]
  },
  resolve: {
    alias: {}
  },
  node: {
    Buffer: false
  },
};
module.exports.resolve.alias.vue = process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new babili({}));
}
