//path.resolve方法用于将相对路径转为绝对路径。
//它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。cd指令
//如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠。
//path.join方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“。
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');

var publicPath = "http://localhost:3000/";
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

devConfig = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: {
        page1: ["./client/page1", hotMiddlewareScript]
    },
    output: {
        path: path.resolve('./public'),
        filename:"./[name]/bundle.js",
        publicPath: publicPath
    },
    // devServer: {
    //     port: 3000,
    //     contentBase: "./client",
    //     colors: true,
    //     inline: true
    // },
    module: {
        loaders: [
            // 样式动态插入html style标签里
            {test: /\.js$/, loader: 'babel'},

            //图片文件使用 url-loader 来处理，小于40kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=40000'},

            // ExtractTextPlugin.extract()动态输出Link标签
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 和autoprefixer 兼容css后缀 来编译处理
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css??sourceMap!resolve-url!sass?sourceMap?modules!postcss') },
            {
              test: /\.scss$/, loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
            }
        ]
    },
    // postcss: [
    //     require('autoprefixer')
    // ],
    resolve: {
        extensions: ['', '.vue', '.js', '.json', '.scss', '.css'],
        //引入cdn外部文件，查询速度快
        // alias: {
        //  'react':path.join()
        // }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'My App',
        //     //filename: '.public/index.html'
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin("common.js"),
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.UglifyJsPlugin()
    ]
}

module.exports = devConfig;