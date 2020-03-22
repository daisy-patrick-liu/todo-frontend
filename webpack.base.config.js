const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        publicPath:"/",
        path: path.join(__dirname, 'dist/')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js[x]?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {//antd样式处理
                test:/\.css$/,
                exclude:/src/,
                use:[
                    { loader: "style-loader",},
                    {
                        loader: "css-loader",
                        options:{
                            importLoaders:1
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ]
}
