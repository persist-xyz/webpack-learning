let path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js' 
    },
    output: {
        publicPath: __dirname + '/dist/',   // js引用的路径或者CDN路径
        path: path.resolve(__dirname, 'dist'),  // 输出目录
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}

