// import _ from 'lodash'

function component() {
  let btn = document.createElement('div')
  btn.innerHTML = join(['Hello', 'webpack'], ' ')

  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
  });
  
  this.alert('xyz')
  return btn;
}
document.body.appendChild(component());
