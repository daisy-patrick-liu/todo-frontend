const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const { CleanWepackPlugin } = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin")
const webpack = require('webpack')

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // compile time plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        // webpack-dev-server enhancement plugins
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    mode: 'production'
})
