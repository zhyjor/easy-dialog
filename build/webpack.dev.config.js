const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '../example'),
    entry: {
        example: './example.js'
    },
    output: {
        path: path.join(__dirname, '../dist/example'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader?minimize'
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                loader: 'css-loader'
            },
            {
                // 增加对 SCSS 文件的支持
                test: /\.scss/,
                // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: '"dev"',
            'process.env.NODE_ENV': '"dev"'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../example/index.html')
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8001'})
    ]
};