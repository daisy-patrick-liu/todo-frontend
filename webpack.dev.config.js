const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 3001,
        hot: true,
        historyApiFallback: true,
        // proxy: {
        //     "/list": {target: 'http://localhost:3000'},
        //     "/create": {target: 'http://localhost:3000'}
        // }
        proxy: [{
            context: ['/list', '/create', '/update'],
            target: 'http://localhost:3000'
        }]
    }
})
