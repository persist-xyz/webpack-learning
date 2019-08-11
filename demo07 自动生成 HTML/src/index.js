
document.addEventListener('click', function() {
    import(/* webpackChunkName: 'use-lodash-xyz'*/ 'lodash').then(function(_) {
        document.body.innerText = 'hello world'
        console.log(_.join(['1', '2']))
    })
})
