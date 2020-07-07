const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(process.cwd(), "src/main.js"),
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(process.cwd(), 'dist')
    },
    plugins: [
        // new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'public/index.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'public/header.html'),
            filename: 'header.html',
            chunks: ['header']
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    }, 'css-loader',  {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }, 'less-loader'
                ]
            }
        ]
    }
}