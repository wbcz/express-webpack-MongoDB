
const path = require('path');

module.exports = {
	rootPath: path.resolve(__dirname, './../'),
	distPath: path.resolve(__dirname, './../dist'),
	publicPath: "http://localhost:3000",
	provideItems: {
    	Vue: 'vue'
	},
	api: path.resolve(__dirname, './../build/api')
}