import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
// if(process.env.NODE_ENV !== 'production'){
//   require('./mock')
// }

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.use(iview);

const handleClick = event => {
  console.log(event);
  event.stopPropagation();
};

const getLiEleArr = (h) => {
  let list = [
    {
      name: 'test1',
    },
    {
      name: 'test2'
    }
  ];
  return list.map((item, index) => {
    return h('li', {
      on: {
        click: handleClick
      },
      key: index
    }, item.name);
  })
};
new Vue({
  router,
  store,
  // render: h => h(CountTo, {
  //   'class': [],
  //   style: {},
  //   attrs: {},
  //   props: {
  //     endVal: 100
  //   },
  //   domProps: {
  //
  //   },
  //   on: {
  //     'on-animation-end': (val) => {
  //       console.log('end', val);
  //     }
  //   },
  //   nativeOn: {
  //     click: () => {
  //       console.log('click')
  //     }
  //   },
  //   directives: [],
  //   slot: '',
  //   scopedSlots: {},
  //   key: '',
  //   ref: ''
  // })
  // render:h => h('div', [
  //   h('ul', {
  //     on: {
  //       click: handleClick
  //     }
  //   }, getLiEleArr(h))
  // ])
  render: h => h(App)
}).$mount('#app')
