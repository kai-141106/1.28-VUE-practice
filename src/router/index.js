import Vue from 'vue'
import VueRouter from 'vue-router'
import loginView from '@/views/Login/Login.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: loginView }
]

const router = new VueRouter({
  routes
})

export default router
