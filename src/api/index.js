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

// 获取用户信息
export const userInfoAPI = () => {
  return request({
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  })
}

// 获取频道
export const channelListAPI = () => request({
  url: '/mp/v1_0/channels',
  method: 'GET'
})

// 发布文章
export const articleAddAPI = (params, data) => request({
  url: '/mp/v1_0/articles',
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  },
  params: params,
  data: data
})

// 文章_获取列表
export const articleListAPI = (params) => request({
  url: '/mp/v1_0/articles',
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  },
  params
})

// 删除文章  --1.31 未引用
export const articleDeleteAPI = (id) => request({
  url: '/mp/v1_0/articles/' + id,
  method: 'DELETE',
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
  }
})
