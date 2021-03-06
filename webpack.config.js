const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const argv = require('yargs').argv;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
	entry: {
		main: './src/js/index.ts'
	},
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: distPath
	},
	module: {
		rules: [{
			test: /\.html$/,
			use: 'html-loader'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [
							isProduction ? require('cssnano') : () => {},
							require('autoprefixer')({
								overrideBrowserslist: ['last 2 versions']
							})
						]
					}
				},
				'sass-loader'
			]
		}, {
			test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]'
				}
			}, {
				loader: 'image-webpack-loader',
				options: {
					mozjpeg: {
						progressive: true,
						quality: 70
					}
				}
			},
			],
		}, {
			test: /fonts[\\\/].+\.(otf|eot|svg|ttf|woff|woff2)$/i,
			use: {
				loader: 'file-loader',
				options: {
					name: 'fonts/[name][hash].[ext]'
				}
			},
		}, {
			test: /sprites[\\\/].+\.(jpg|png|json|atlas)$/i,
			use: {
				loader: 'file-loader',
				options: {
					name: 'sprites/[name].[ext]'
				}
			},
		}, {
			test: /shaders[\\\/].+\.(frag|frag2)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'shaders/[path][name].[ext]'
				}
			}
			],
		}]
	},
	plugins: [
		new CopyWebpackPlugin([
			{from:'src/sprites',to:'sprites'} 
		]), 
		new CopyWebpackPlugin([
			{from:'src/shaders',to:'shaders'} 
		]), 
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),
		...glob.sync('./src/*.html')
			.map(htmlFile => {
				return new HtmlWebpackPlugin({
					filename: path.basename(htmlFile),
					template: htmlFile
				});
			})
	],
	optimization: isProduction ? {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					compress: {
						inline: false,
						drop_console: true
					},
				},
			}),
		],
	} : {},
	devServer: {
		contentBase: distPath,
		port: 9000,
		compress: true,
		open: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	}
};

module.exports = config;
