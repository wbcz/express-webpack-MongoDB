
const path = require('path');

module.exports = {
	rootPath: path.resolve(__dirname, './../'),
	distPath: path.resolve(__dirname, './../dist'),
	publicPath: "http://localhost:4000", //cdn
	provideItems: {
    	Vue: 'vue'
	},
	proxyConfi: {
		target: 'http://cnodejs.org/api/v1',
	    changeOrigin: true,
	    ws: true,
	    // pathRewrite: {
	    //     '^/api': '/'
	    // },
	    router: {
	        'dev.localhost:3000' : 'http://localhost:8000'
	    }
	},
	port: 3000,
	timeout: 4000
}