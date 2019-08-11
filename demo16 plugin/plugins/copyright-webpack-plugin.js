class CopyrightWebpackPlugin {
    constructor (options) {
        console.log('插件被使用了')
        console.log('options:', options)
    }
    apply (compiler) {
        // compiler 可看作是webpack的实例

        // 当要把代码放入到 dist 目录之前，就会触发这个钩子
        compiler.hooks.emit.tapAsync(
            'CopyrightWebpackPlugin',
            (compilation, cb) => {
                // compilation 这个参数里存放了这次打包的所有内容
                // 返回结果是一个对象，bundle.js 是 key，也就是打包后生成的文件名及文件后缀
                console.log('1compilation.assets = ', compilation.assets)
                /* { 'bundle.js':
                    CachedSource {
                        _source: ConcatSource { children: [Array] },
                        _cachedSource: undefined,
                        _cachedSize: undefined,
                        _cachedMaps: {},
                        node: [Function],
                        listMap: [Function] 
                    }
                } */

                // 在 dist 目录下生成了 copyright.txt 文件
                compilation.assets['copyright.txt'] = {
                    source: function () {
                        return 'copyright by xyz'
                    },
                    size: function () {
                        return 20
                    }
                }
                console.log('2compilation.assets = ', compilation.assets)
                cb()
            }
        )
    }
}

module.exports = CopyrightWebpackPlugin


