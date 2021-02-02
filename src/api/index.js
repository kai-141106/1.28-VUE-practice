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
    url: '/mp/v1_0/user/profile'

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
  params: params,
  data: data
})

// 文章_获取列表
export const articleListAPI = (params) => request({
  url: '/mp/v1_0/articles',
  method: 'GET',
  params
})

// 删除文章
export const articleDeleteAPI = (id) => request({
  url: '/mp/v1_0/articles/' + id,
  method: 'DELETE'

})

// 获取指定文章的
export const articleByIdAPI = (id) => request({
  url: '/mp/v1_0/articles/' + id,
  method: 'GET'

})

// 更新指定文章
export const articleUpdateAPI = (id, params, data) => request({
  url: '/mp/v1_0/articles/' + id,
  method: 'PUT',
  params,
  data
})

// 获取图片素材
export const imgListAPI = (params) => request({
  url: '/mp/v1_0/user/images',
  method: 'GET',
  params
})
