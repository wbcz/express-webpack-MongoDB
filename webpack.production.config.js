var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var productionConfig = [{
    entry: {
        page1: './client/page1',
        page2: './client/page2'
    },
    output: {
        filename: './[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    module: {
        loaders: [
         {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
        }, 
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
        }]
    },
    plugins: [
        new ExtractTextPlugin('./[name]/index[hash].css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin("common.js"),
        new HtmlWebpackPlugin({
            title: 'My App',
            //filename: '',
            template: './client/template/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}];

module.exports = productionConfig;