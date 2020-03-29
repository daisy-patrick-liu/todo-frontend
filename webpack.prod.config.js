const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const DashboardPlugin = require("webpack-dashboard/plugin")
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // compile time plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        // webpack-dev-server enhancement plugins
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimizer: [new TerserPlugin({ /* additional options here */ })],
    },
    mode: 'production'
})
