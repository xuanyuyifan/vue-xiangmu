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
