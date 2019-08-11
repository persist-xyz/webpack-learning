
const loaderUtils = require('loader-utils')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)

    console.log(this.query)
    console.log(options)    // 输出内容一致

    // const content = source.replace('world', options.name)
    // this.callback(null, content)


    // 写异步代码
    const callback = this.async()
    setTimeout(() => {
        const content = source.replace('world', options.name)
        callback(null, content)
    }, 100)
}


