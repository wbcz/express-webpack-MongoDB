/* global require, module, process */
const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require('shelljs/global')
rm('-rf', './public')

prodConfig = merge(baseWebpackConfig, {
    devtool: '#source-map',
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // minChunks: 2,
            // chunks:['index', 'module1'] //只有index、module1都引用的的模块才会被打包到公共模块
        }),
        new ExtractTextPlugin('./[name]/index[hash].css')
    ]
})

module.exports = prodConfig
