var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');

var publicPath = "http://localhost:3000/";
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

devConfig = {
    devtool: 'eval-source-map',
    context: __dirname,
    entry: {
        page1: ["./client/page1", hotMiddlewareScript],
        page2: ["./client/page2", hotMiddlewareScript]
    },
    output: {
        path: path.resolve('./public'),
        filename:"./[name]/bundle.js",
        publicPath: publicPath
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/, loader: 'babel'
            // },
            { 
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=40000'
            },
            { 
                test: /\.scss$/, loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
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
                test: /\.(html|tpl)$/, loader: 'html-loader' 
            }
        ]
    },
    // postcss: [
    //     require('autoprefixer

           // ],
    resolve: {
        extensions: ['', '.vue', '.js', '.json', '.scss', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            //filename: 'index.html',
            //template: ('./client/template/index.html')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin("common.js"),
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = devConfig;