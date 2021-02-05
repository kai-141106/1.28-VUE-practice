import Vue from 'vue'
import VueRouter from 'vue-router'
// import AddArticle from '@/views/Article/addArticle'   下方使用懒加载

import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login/Login.vue') },
  {
    path: '/layout',
    component: () => import('@/views/Layout/Layout'),
    redirect: '/layout/home',
    children: [
      { path: 'home', component: () => import('@/views/Home/Home') },
      { path: 'addArticle', component: () => import('@/views/Article/addArticle') },
      { path: 'articleList', component: () => import('@/views/Article/articleList') },
      { path: 'image', name: 'image', component: () => import('@/views/Images/Images') },
      { path: 'comment', name: 'comment', component: () => import('@/views/Comment/Comment') },
      { path: 'fans', name: 'fans', component: () => import('@/views/Fans/Fans') },
      { path: 'settings', name: 'settings', component: () => import('@/views/Settings/Settings') }
    ]
  },
  { path: '*', component: () => import('@/views/404/page404') }
]

//

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !sessionStorage.getItem('token')) {
    Message({
      type: 'error',
      message: '身份错误,请重新登录'
    })
    next('/login')
  } else {
    next()
  }
})
export default router
