// sum.js
// ES6
import sum from './vendor/sum'
console.log('sum(1, 2) = ', sum(1, 2))


// multi.js
// AMD
require(['./vendor/multi'], function(multi) {
    console.log('multi(1, 2) = ', multi(1, 2))
})


// minus.js
// CMD
let minus = require('./vendor/minus')
console.log('minus(1, 2) = ', minus(1, 2))


$.get(
    '/comments/hotflow',
    {
      id: '4263554020904293',
      mid: '4263554020904293',
      max_id_type: '0'
    },
    function(data) {
      console.log(data)
    }
)


if (module.hot) {
    // 检测是否有模块热更新
    module.hot.accept('./vendor/sum.js', function() {
        // 针对被更新的模块, 进行进一步操作
        console.log('/vendor/sum.js is changed')
    })
}

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
