let path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js' 
    },
    output: {
        publicPath:'./',   // js引用的路径或者CDN路径
        path: path.resolve(__dirname, 'dist'),  // 输出目录
        filename: '[name].bundle.js',   // 代码打包后的文件名
        chunkFilename: '[name].js'  // 代码拆分后的文件名
    },
    resolve: {
        alias: {
            jQuery: path.resolve(__dirname, 'src/vendor/jquery.js')
        }
    },
    module: {
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '自动生成 HTML',
            minify: {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
            },
            filename: 'index.html', // 生成后的文件名
            template: 'index.html', // 根据此模版生成 HTML 文件
            chunks: ['app'] // entry中的 app 入口才会被打包
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',    // 通过npm引入
            jQuery: 'jQuery'    // 通过别名引入
        })
    ]
}

