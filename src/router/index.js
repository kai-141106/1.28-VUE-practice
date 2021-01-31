import Vue from 'vue'
import VueRouter from 'vue-router'
import loginView from '@/views/Login/Login.vue'
import LayoutView from '@/views/Layout/Layout'
import Page404View from '@/views/404/page404'
import HomeView from '@/views/Home/Home'
// import AddArticle from '@/views/Article/addArticle'   下方使用懒加载

import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: loginView },
  {
    path: '/layout',
    component: LayoutView,
    redirect: '/layout/home',
    children: [
      { path: 'home', component: HomeView },
      { path: 'addArticle', component: () => import('@/views/Article/addArticle') },
      { path: 'articleList', component: () => import('@/views/Article/articleList') }
    ]
  },
  { path: '*', component: Page404View }
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
