import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import HOME from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/user'
Vue.use(Router)
var router = new Router({
  routes: [
    // { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: HOME,
      redirect: '/Welcome',
      children: [
        { path: '/Welcome', component: Welcome },
        { path: '/users', component: User }
      ]
    }
  ]
})
// export default new Router({
//   routes: [
//     // { path: '/', name: 'HelloWorld', component: HelloWorld },
//     { path: '/login', component: Login },
//     {
//       path: '/home',
//       component: HOME,
//       redirect: '/Welcome',
//       children: [{ path: '/Welcome', component: Welcome }]
//     }
//   ]
// })
// 给路由设置导航首位
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') {
    return next()
  }
  //  请求login就判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  // 请继续执行
  next()
})
export default router
