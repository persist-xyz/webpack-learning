const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js' 
    },
    output: {
        publicPath:'',   // js引用的路径或者CDN路径
        path: path.resolve(__dirname, 'dist'),  // 输出目录
        filename: '[name].bundle.js',   // 代码打包后的文件名
        chunkFilename: '[name].js'  // 代码拆分后的文件名
    },
    mode: "development", // 开发模式
    devtool: "source-map", // 开启调试
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8000, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
          // 跨域代理转发
          "/comments": {
            target: "https://m.weibo.cn",
            changeOrigin: true,
            logLevel: "debug",
            headers: {
              Cookie: ""
            }
          }
        },
        historyApiFallback: {
          // HTML5 history模式
          rewrites: [{ from: /.*/, to: "/index.html" }]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成后的文件名
            template: 'index.html', // 根据此模版生成 HTML 文件
            chunks: ['app'] // entry中的 app 入口才会被打包
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}
