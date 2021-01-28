// 封装axios
// 请求路径公共头部
import axios from 'axios'
const ajax = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})
export default ajax
