
/* import _ from 'lodash'
console.log(_.join(['a', 'b', 'c']))
*/

/* function getComponent() {
    // 使用 异步的形式导入 lodash，default: _ 表示用 _ 代指 lodash
    return import('lodash').then(({ default: _ }) => {
      var element = document.createElement('div')
      element.innerHTML = _.join(['hello', 'world'], '-')
      return element
    })
}
  
getComponent().then(element => {
    document.body.appendChild(element)
}) */


// 异步代码
// webpack 对异步代码通过注释可以直接修改打包后的名称

import(/* webpackChunkName: 'aa'*/ './a').then(function(a) {
    console.log(a)
})

import(/* webpackChunkName: 'bb'*/ './b').then(function(b) {
    console.log(b)
})

import(/* webpackChunkName: 'use-lodash-xyz'*/ 'lodash').then(function(_) {
    console.log(_.join(['1', '2']))
})