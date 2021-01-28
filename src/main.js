import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.less'
// 引入element-ui组件库 及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
