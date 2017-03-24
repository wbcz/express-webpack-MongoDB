const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entris = require('./utils')
require('shelljs/global')
let {rootPath, distPath, publicPath, provideItems, api} = require('../config/index')
rm('-rf', distPath)

const prodConfig = merge(baseWebpackConfig, {
    // devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name]/index[hash].css')
    ]
})

Object.keys(entris).forEach(function(entry) {
    prodConfig.plugins.push(new HtmlWebpackPlugin({
        chunks: [entry],
        title: entry,
        //template: require('html-webpack-template'),
        // routeApi: process.env.NODE_ENV == 'dev'
        //  ? 'http://localhost:3000'
        //  : 'http://localhost:9000',
        filename: entry + '/index.html',
        appMountId: "app",
        //baseHref: 'http://example.com/awesome',
        googleAnalytics: {
            trackingId: 'UA-XXXX-XX',
            pageViewOnLoad: true
        },
        title: entry,
        meta: [
            {
              name: 'description',
              content: 'Vue2 + Webpack + Express + MongoDB'
            },
            {
              name: 'cache-control',
              content: 'no-cache'
            },
            {
              name: 'cache-control',
              content: 'max-age=0'
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, user-scalable=no'
            },
        ],
        mobile: true,
        template: rootPath +'/client/template/index.ejs',
        inject: false,
        // window: {
        //     env: {
        //         apiHost: 'http://myapi.com/api/v1'
        //     }
        // }
    }))
})

module.exports = prodConfig
