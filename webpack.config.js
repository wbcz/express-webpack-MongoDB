var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var entris = require('./client/utils/')

var publicPath = "http://localhost:3000";
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
console.log(entris)
devConfig = {
    devtool: 'eval-source-map',
    context: __dirname,
    entry: entris,
    output: {
        path: path.resolve('./public'),
        filename:"[name]/index.js",
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                include: __dirname,
                loader: 'babel',
                query: {
                    babelrc: true,
                    presets: [
                        ['es2015', { modules: false }],
                    ],
                },
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
        // 用于sass import时的路径查找，默认会在 ../common/style 目录下查找
        includePaths: [ path.resolve(__dirname, './client/common/style') ],
    },
    resolve: {
        extensions: ['', '.vue', '.js', '.json', '.scss', '.css'],
        alias: {
            '~components': path.resolve(__dirname, './client/common/components'),
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin("common.js"),
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin()
    ]
}

Object.keys(entris).forEach(function(entry) {
    console.log(entry + '/index.html')
    devConfig.plugins.push(new HtmlWebpackPlugin({
        chunks: [entry,'common.js'],
        filename: entry + '/index.html',
        template: __dirname + '/client/template/index.html',
        inject: true
    }))
})

module.exports = devConfig;