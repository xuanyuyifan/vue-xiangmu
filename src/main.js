import Vue from 'vue'
import App from './App'
import router from './router'

// 引入控制全局的css样式
import './assets/css/global.css'

// 引入element-ui组件库
import ElementUI from 'element-ui'
// 引入字体图标
import './assets/fon-ico/iconfont.css'
// 引入axios并做相关的配置
import axios from 'axios'
// axios请求根地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios拦截器在此配置
// axios.interceptors.request.use(
//   function(config) {
//     // config代表axios对象的子级配置
//     var token = window.sessionStorage.getItem('token')
//     config.headers.Authorization = token
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )
axios.interceptors.request.use(
  function(config) {
    // 配置token
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 给axios配置vue的$http
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
