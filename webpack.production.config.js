var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var entris = require('./client/utils/')

require('shelljs/global')
rm('-rf', './public')

var productionConfig = [{
    entry: entris,
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, './public'),
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
        },]
    },
    vue: {
        loaders: {
            // 将css文件编译到单独文件
            sass: ExtractTextPlugin.extract('css!autoprefixer!sass'), 
            css: ExtractTextPlugin.extract('css!autoprefixer')
        }
    },
    resolve: {
        extensions: ['', '.vue', '.js', '.json', '.scss', '.css']
    },
    plugins: [
        new ExtractTextPlugin('./[name]/index[hash].css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            minimize: true,
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin("common.js"),
    ]
}];

Object.keys(entris).forEach(function(entry) {
    productionConfig[0].plugins.push(new HtmlWebpackPlugin({
        chunks: [entry],
        filename: entry + '/index.html',
        template: path.resolve(__dirname, './client/template/index.html'),
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    }))
})

module.exports = productionConfig;
