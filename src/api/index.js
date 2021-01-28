// 把每个请求接口封装为方法
import request from '@/utils/request.js'

// 把登录的接口传出去 方式是导出单个
export const loginAPI = function (data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
}
