let path = require('path')
let webpack = require('webpack')
let pkg = require('../package.json')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '../lib'),
        filename: 'index.js',
        library: 'easyDialog',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html?minimize'
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
            NODE_ENV: '"production"',
            'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),

        new webpack.BannerPlugin([
            pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
            'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
            pkg.license + ' license'
        ].join('\n'))
    ],
    devServer: {}
}