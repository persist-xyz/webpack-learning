
loader:

1、css-loader: 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖

2、style-loader: 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效

3、node-sass sass-loader: 使用 sass-loader 将 scss 转为 css

4、postcss-loader、autoprefixer: 使用 postcss 为 css 加上浏览器前缀
postcss-sprites: 生成雪碧图

由于 module 中的 rules 是倒着执行的，所以最后执行顺序是 sass-loader -> postcss-loader -> css-loader -> MiniCssExtractPlugin.loader

5、url-loader: 会将引入的图片编码，转为 base64 字符串; url-loader 依赖 file-loader

img-loader、imagemin-pngquant、imagemin-mozjpeg: 图片压缩loader, 不同格式需要下载不同loader;

image-webpack-loader: 另一个图片压缩的loader，就是内置了多种图片压缩的插件，安装这一个就可以;





plugin:

1、clean-webpack-plugin: 用来删除output.path目录下的所有文件，以及每次成功打包后所有未使用的 webpack 资产

2、splitChunksPlugins: 代码分割

3、html-webpack-plugin: 生成 HTML 文件，并自动引入打包后的 js 文件

4、mini-css-extract-plugin: 单独分离 CSS 文件
webpack4.2.0之前使用extract-text-webpack-plugin，之后使用mini-css-extract-plugin

5、optimize-css-assets-webpack-plugin: 实现 css 的压缩

6、purify-css: 进行 CSS Tree Shaking 操作,
glob-all(第三方库): 作用是帮助 PurifyCSS 进行路径处理，定位要做 Tree Shaking 的路径文件

7、webpack.DefinePlugin({}) 允许创建一个在编译时可配置的全局常量，
webpack.ProvidePlugin({}) 自动加载模块，会先从npm安装的包中查找符合的库


