const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const entris = require('./client/utils/')

let publicPath = "http://localhost:3000";
let provideItems = {
    Vue: 'vue'
}

const baseConfig = {
    devtool: 'eval-source-map',
    context: __dirname,
    entry: {
        vendor: ["vue"]
    },
    output: {
        path: path.resolve('./public'),
        filename:"[name]/index.js",
        chunkFilename: '[id].[hash].bundle.js',
        publicPath: '/'  //cdn存放的路径
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
        new webpack.ProvidePlugin(
            provideItems
        )
    ]
}

Object.keys(entris).forEach(function(entry) {
    console.log(entry + '/index.html')
    baseConfig.plugins.push(new HtmlWebpackPlugin({
        chunks: [entry,'common.js'],
        filename: entry + '/index.html',
        template: __dirname + '/client/template/index.html',
        inject: true
    }))
})

Object.assign(baseConfig.entry, entris)

module.exports = baseConfig;