const path = require('path');
const webpack = require("webpack");
const TwineFormatPlugin = require("./webpack/TwineFormatPlugin.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let modules = 

module.exports = [{
		entry: {
			"code.js": "./src/script.tsx",
			"design.css": "./design.css"
		},
		output: {
			path: __dirname,
			filename: "./dist/bundle-[name]"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"]
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						use: "css-loader"
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin("./dist/design.css"), new TwineFormatPlugin()
		]
	},
	{
		entry: "./scripts/item-table-generator.ts",
		output: {
			path: __dirname,
			filename: "./dist/item-table-generator"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"]
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					exclude: /node_modules/
				}
			]
		}
	}
];