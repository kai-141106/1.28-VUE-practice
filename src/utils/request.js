// 封装axios
// 请求路径公共头部
import axios from 'axios'
import { Message } from 'element-ui'
const ajax = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  const errTxtObj = {
    'Please verify your real information in app.': '手机号码有误',
    'Invalid code.': '验证码错误',
    'User must be authorized.': '身份错误，请重新登录'
    // '': '身份验证失败'
  }
  const messageKey = error.response.data.message
  Message({
    type: 'error',
    message: errTxtObj[messageKey],
    onClose () {
      if (error.response.status === 401) {
        sessionStorage.clear()
        window.location.href = '/'
      }
    }
  })
  // 对响应错误做点什么

  console.dir(error)
  return Promise.reject(error)
})
export default ajax
