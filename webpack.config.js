const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const outputDirectory = 'dist';

module.exports = {
	entry: ['babel-polyfill', './src/client/index.js'],
	output: {
		path: path.join( __dirname, outputDirectory ),
		filename: 'bundle.js',
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000,
							name : 'assets/img/[name].[ext]'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		port: 3000,
		open: true,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:8080'
		}
	},
	plugins: [
		new CleanWebpackPlugin( {
			cleanAfterEveryBuildPatterns: [outputDirectory] 
		}),
		new HtmlWebpackPlugin( {
			template: './public/index.html',
		} )
	]
};
