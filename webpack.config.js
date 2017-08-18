const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
  entry: './Express_dataTable.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      {
        test: /\.css$/,
        use:  ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:"css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
    {
  //    template:'./ResponsiveTableBootstrap.html',
      favicon: './src/assets/favicon.ico'
    }),
    new ExtractTextPlugin("bundle.css")
  ]
};

module.exports = config;
