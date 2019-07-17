const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
		bundle: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js'
  },
	resolve: {
	},
  module: {
    rules: [
			{
			  test: /\.js$/,
			  use: 'babel-loader',
			  exclude: /node_modules/
			},
			{
			  test: /\.(png|svg|jpg|gif)$/,
			  use: [{
					loader:'file-loader',
					options:{
						name:"[name].[ext]",
						publicPath:"images/",
						outputPath:"images/",
					}
				}]
			},
			{
			  test: /\.(woff|woff2|eot|ttf|otf)$/,
			  use: [
			    'file-loader'
			  ]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
			}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
		new MiniCssExtractPlugin({
		  filename: "css/[name].css",
		  chunkFilename: "[id].css"
		})
  ]
};