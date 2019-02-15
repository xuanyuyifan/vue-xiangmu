import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import HOME from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/login', component: Login },
    { path: '/home', component: HOME }
  ]
})
