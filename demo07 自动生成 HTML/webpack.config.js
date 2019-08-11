let path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js' 
    },
    output: {
        publicPath:'./',   // js引用的路径或者CDN路径
        path: path.resolve(__dirname, 'dist'),  // 输出目录
        filename: '[name].bundle.js',   // 代码打包后的文件名
        chunkFilename: '[name].js'  // 代码拆分后的文件名
    },
    optimization: {
        // 默认配置
        splitChunks: {
            // chunks: 'all': 分割所有代码，包括同步代码和异步代码; webpack 默认是 chunks: 'async' 分割异步代码
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                lodash: {
                    name: 'lodash',
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 10  // 优先级越高的会越先被打包
                },
                commons: {
                    name: 'chunk-commons',
                    minSize: 1, //表示在压缩前的最小模块大小,默认值是 30kb
                    minChunks: 2, // 最小公用次数
                    priority: 5, // 优先级
                    reuseExistingChunk: true // 公共模块必开启
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
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
            template: 'index.html' // 根据此模版生成 HTML 文件
        })
    ]
}

