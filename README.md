### Readme

1、在 webpack4 以前的版本中，必须在名为 webpack.config.js 的配置文件中 通过  entry  属性定义 `entry point`(入口点)，
从 webpack4 开始，`entry point`(入口点)：将默认为 `./src/index.js`

2、`production mode`(生产模式)  可以开箱即用地进行各种优化。包括压缩，作用域提升，tree-shaking 等。

3、若使用AMD方式引入文件，打包后会另外生成一个`bundle.js`文件，

4、`transpiling`(转译) 是指采用 ES6 语法，转译为旧浏览器可以理解的行为。

``` npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime  @babel/polyfill @babel/runtime --save-dev ```


若用Babel7，需要安装 ``` @babel/core、@babel/preset-env 和 @babel/plugin-transform-runtime```
若用Babel6，需要安装 ```babel-core、babel-preset-env 和 babel-plugin-transform-runtime```

`@babel/cli`：是babel提供的内建的命令行工具，主要是提供babel这个命令来对js文件进行编译；
另外也依赖一个叫@babel/core的包文件，因为执行编译的transform方法在这个包里。

`@babel/preset-env`：包含 ES6、7 等版本的语法转化规则
`@babel/plugin-transform-runtime`：是一个插件，需要配置在.babelrc中；用来避免 polyfill 污染全局变量，减小打包体积
`@babel/polyfill`：polyfill，直译“垫片”，就是垫平不同浏览器或者不同环境下的差异。babel默认只转译语法，这是作为ES6内置方法和函数的转化垫片
`babel-loader`：负责 ES6 语法转化

`.babelrc`配置文件：解决在使用Babel调用插件时需要使用命令行参数的形式，可以将多个插件的信息写入到配置文件中，因为@babel/cli在调用之前都会去调用`.babelrc`文件
另外，Babel为我们预设了一些常用的插件包，可在`preset`中配置，

`.browserslistrc`：用于在不同前端工具之间共享目标浏览器和 Node.js 版本的配置；
配置完成之后，所有工具都会自动找到目标浏览器
可添加到 package.json，也可以配置在单独文件中

5、代码分割
webpack4之前用的`commonsChunkPlugin`，4之后替换为`splitChunksPlugins`，是webpack主模块中的细分模块，无需npm引入
```
optimization: {
    splitChunks: {
        chunks: 'all',  // 分割所有代码，包括同步代码和异步代码; webpack 默认是 chunks: 'async' 分割异步代码
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,   // 最小公用 1 次才分割
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
                name: 'commons',
                minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
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
}
```

6、懒加载、预加载, 代码使用率可利用浏览器控制台coverage来查看
懒加载是ES6中的import语法，webpack 只是能够识别 import 语法，能进行代码分割而已。

预加载  Prefetching/Preloading ，会有兼容性的问题
webpackPrefetch: true 会等你主要的 JS 都加载完了之后，网络带宽空闲的时候，就会预先帮你加载好

与 prefetch 相比，Preload 指令有很多不同之处：
Prefetch 会等待核心代码加载完之后，有空闲之后再去加载。Preload 会和核心的代码并行加载，不推荐


7、单独分离 CSS 文件，webpack4之前使用extract-text-webpack-plugin，之后使用mini-css-extract-plugin


8、Tree Shaking
指在打包时去掉没有用到的代码，依赖的是ES6的模块系统（比如：import 和 export）
对于第三方库，若需要应用Tree Shaking，则只有安装对应的ES6模块的版本，而不能使用CommonJS模块的版本，
比如使用lodash：npm i lodash-es --save


9、模块热更新
需要 HotModuleReplacementPlugin 和 NamedModulesPlugin 这两个插件，顺序不能错，并且指定 devServer.hot 为 true


10、PWA配置 (只有要上线的代码才需要)
第一次访问的时候，做一个缓存，当服务器挂了之后，依然可以访问这个页面
首先安装一个插件：`workbox-webpack-plugin`
添加配置：
```
plugins: [
    // 配置 PWA
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
]
```
重新打包，在 dist 目录下会多出 service-worker.js 和 precache-manifest.js 两个文件，通过这两个文件就能使我们的网页支持 PWA 技术
还需要去业务代码中使用 service-worker，在 app.js 中加上以下代码
```
// 判断该浏览器支不支持 serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('service-worker registed')
      })
      .catch(error => {
        console.log('service-worker registed error')
      })
  })
}
```

11、写一个loader
`loader-utils` 用来获取options中的内容
想传递额外的信息出去，需要用
```
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
)
```
异步代码需要用`this.async()`来写

如果有多个自定义 loader，可以使用 resolveLoader，定义 modules，当你使用 loader 的时候，会先去node_modules 中去找，如果没找到就会去 ./loaders 中找
```
resolveLoader: {
    modules: ['node_modules', './loaders']
},
```


12、写一个plugins
本质上就是一个类，内部必须得实现一个apply（compiler）方法，compiler可看作是webpack的实例，它有很多钩子函数，可以在不同阶段处理不同功能



### Record


#### loader:

1、css-loader: 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖

2、style-loader: 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效

3、node-sass sass-loader: 使用 sass-loader 将 scss 转为 css

4、postcss-loader、autoprefixer: 使用 postcss 为 css 加上浏览器前缀
postcss-sprites: 生成雪碧图

由于 module 中的 rules 是倒着执行的，所以最后执行顺序是 sass-loader -> postcss-loader -> css-loader -> MiniCssExtractPlugin.loader

5、url-loader: 会将引入的图片编码，转为 base64 字符串; url-loader 依赖 file-loader

img-loader、imagemin-pngquant、imagemin-mozjpeg: 图片压缩loader, 不同格式需要下载不同loader;

image-webpack-loader: 另一个图片压缩的loader，就是内置了多种图片压缩的插件，安装这一个就可以;






#### plugin:

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


