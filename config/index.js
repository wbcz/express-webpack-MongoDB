
const path = require('path');

module.exports = {
	rootPath: path.resolve(__dirname, './../'),
	distPath: path.resolve(__dirname, './../dist'),
	publicPath: "http://localhost:4000", //cdn
	provideItems: {
		Vue: 'vue'
	},
	proxyConfi: {
		// target: 'http://cnodejs.org/api/v1',
		target: 'http://localhost:3000',
		changeOrigin: true,
		ws: true,
		// pathRewrite: {
		//     '^/api': '/'
		// },
	},
	port: 8080,
	timeout: 4000
}