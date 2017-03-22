var path = require("path")
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')

var devConfig = merge(baseWebpackConfig, {
    output: {
        publicPath: '/'
    },
    devtool: '#eval-source-map',
    plugins: [
        // new webpack.DefinePlugin({'process.env': config.dev.env}),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common.js",
            minChunks: 2
        })
    ]
})

module.exports = devConfig
