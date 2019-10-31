const path = require('path');
const webpack = require('webpack');

let date = (new Date()).toISOString()

console.log(__dirname, '/src/js/components/');

var front = {
	entry:{
		main: [ __dirname + '/src/js/main.js']
	},
	output: {
		path: path.resolve(__dirname, 'public/build/js'),
		filename: '[name].js?' + date,
		publicPath: '/src/build/js/'
	},
	mode: 'development',//'development', production
	plugins: [],
	module: {
		rules: [
			{test: /\.vue$/, loader: 'vue-loader',}
		]
	},
	resolve:{
		alias: {
			'@Components': path.join(__dirname, '/src/js/components/'),
			'@Modules': path.join(__dirname, '/src/js/modules/'),
			'@Class': path.join(__dirname, '/src/js/class/'),
		},
	}
}

var admin = {
	entry:{
		main: [ __dirname + '/src/admin/main.js'],
		login: [ __dirname + '/src/admin/login.js']
	},
	output: {
		path: path.resolve(__dirname, 'public/admin/build/js'),
		filename: '[name].js?' + date,
		publicPath: '/src/admin/build/js/'
	},
	mode: 'development',//'development', production
	plugins: [],
	module: {
		rules: [
			{test: /\.vue$/, loader: 'vue-loader',}
		]
	},
	resolve:{
		alias: {
			'@Components': path.join(__dirname, '/src/admin/components/'),
			'@Modules': path.join(__dirname, '/src/admin/modules/'),
			'@Class': path.join(__dirname, '/src/admin/class/'),
		},
	}
}

module.exports = [front,admin];