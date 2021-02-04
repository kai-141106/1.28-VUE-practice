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

// 更新用户信息
export const updateUserInfoAPI = (data) => request({
  url: '/mp/v1_0/user/profile',
  method: 'PATCH',
  data
})
// 更新用户头像
export const updateAvatarAPI = (data) => request({
  url: '/mp/v1_0/user/photo',
  method: 'PATCH',
  data
})

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

// 图片收藏/取消
export const collectedImgAPI = (id, data) => request({
  url: '/mp/v1_0/user/images/' + id,
  method: 'PUT',
  data
})
// 删除图片
export const imgDelAPI = (id) => request({
  url: '/mp/v1_0/user/images/' + id,
  method: 'DELETE'
})

// 评论管理-获取评论列表
export const commentListAPI = (params) => request({
  url: '/mp/v1_0/articles',
  method: 'GET',
  params: {
    response_type: 'comment',
    ...params
  }
})
// 评论管理 开启或关闭评论
export const openOrCloseAPI = (params, data) => request({
  url: '/mp/v1_0/comments/status',
  method: 'PUT',
  params,
  data
})
// 获取粉丝列表
export const fansListAPI = (params) => request({
  url: '/mp/v1_0/followers',
  method: 'GET',
  params
})
