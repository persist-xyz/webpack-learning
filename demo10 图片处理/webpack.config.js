let path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

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
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,    // 针对 .css 后缀的文件设置 loader
                // sass-loader -> postcss-loader -> css-loader -> MiniCssExtractPlugin.loader
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 
                    'css-loader',
                    // 使用 postcss 为 css 加上浏览器前缀
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    'sass-loader' // 使用 sass-loader 将 scss 转为 css
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        name: '[name]-[hash:5].min.[ext]',
                        outputPath: 'images/', // 输出到 images 文件夹
                        limit: 1000  // 把 <= 1kb 的文件转成 Base64 的格式
                        }
                    },
                    // img-loader for zip img
                    {
                        loader: 'image-webpack-loader',
                        options: {
                        // 压缩 jpg/jpeg 图片
                            mozjpeg: {
                                progressive: true,
                                quality: 65 // 压缩率
                            },
                            // 压缩 png 图片
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
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
            template: 'index.html', // 根据此模版生成 HTML 文件
            chunks: ['app'] // entry中的 app 入口才会被打包
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), // 用于优化/最小化 CSS 的 CSS 处理器，默认为 cssnano
            cssProcessorOptions: {  // 传递给 cssProcessor 的选项，默认为{}
                safe: true, 
                discardComments: {
                     removeAll: true 
                } 
            },
            canPrint: true // 布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        }),
        // 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, './*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ]
}

