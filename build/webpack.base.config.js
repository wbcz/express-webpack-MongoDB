const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const entris = require('./utils')
let {rootPath, distPath, publicPath, provideItems, api} = require('../config/index')

const baseConfig = {
    devtool: 'eval-source-map',
    entry: {
        vendor: ["vue"]
    },
    output: {
        path: distPath,
        filename:"[name]/index.js",
        chunkFilename: '[id].[hash].bundle.js',
        publicPath: '/'  //cdn存放的路径
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                include: rootPath,
                loader: 'babel',
                query: {
                    babelrc: true,
                    presets: [
                        ['es2015', { modules: false }],
                    ],
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }, 
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style','css!autoprefixer!less')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
            },
            {   test: /\.hbs$/, 
                loader: "handlebars",
                include: rootPath
            }
        ]
    },
    vue: {
        loaders: {
            // 将css文件编译到单独文件
            sass: ExtractTextPlugin.extract('css!autoprefixer!sass'), 
            css: ExtractTextPlugin.extract('css!autoprefixer')
        }
    },
    sassLoader: {
        includePaths: [ rootPath + '/client/common/style' ],
    },
    resolve: {
        extensions: ['', '.vue', '.js', '.json', '.scss', '.css'],
        alias: {
            '~components': rootPath + '/client/common/components',
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin(
            provideItems
        )
    ]
}

Object.assign(baseConfig.entry, entris)

module.exports = baseConfig;