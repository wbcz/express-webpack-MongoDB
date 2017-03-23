const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entris = require('./utils')
let {rootPath, distPath, publicPath, provideItems, api} = require('../config/index')
const devConfig = merge(baseWebpackConfig, {
    output: {
        publicPath: '/'
    },
    devtool: '#eval-source-map',
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendor.js')
    ]
})

// Object.keys(entris).forEach(function(key){
//     let arr = [entris[key]];
//     arr.unshift('webpack/hot/dev-server','webpack-dev-server/client?http://localhost:3000');
//     entris[key] = arr;
// });

// devConfig.entry = entris

Object.keys(entris).forEach(function(entry) {
    devConfig.plugins.push(new HtmlWebpackPlugin({
        chunks: [entry,'common.js'],
        filename: entry + '/index.html',
        template: rootPath +'/client/template/index.html',
        inject: true
    }))
})

module.exports = devConfig
