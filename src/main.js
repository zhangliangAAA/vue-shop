import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import interceptor from './interceptor';
// 动画1
import {createAPI} from 'cube-ui'
import CartAnim from '@/components/CartAnim'
// 手写动画
import create from './utils/create'

Vue.config.productionTip = false

// 给vue注册实例方法，方法名$createCartAnim
createAPI(Vue, CartAnim, ['transitionend'])

// 添加至prototype
Vue.prototype.$create = create

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 执行拦截器
interceptor(app)