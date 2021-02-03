// 存放表单验证
// login页面的验证规则
export const loginRules = {

  mobile: [{
    required: true,
    message: '请输入正确手机号',
    trigger: 'blur',
    pattern: /^1[3|4|5|6|7|8|9]\d{9}$/
  }],
  code: [{
    required: true,
    message: '请输入6位验证码',
    trigger: 'blur', // 或者change 只要修改就触发
    len: 6
  }],
  check: [{
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error('同意请勾选'))
      } else {
        callback()
      }
    },
    trigger: 'change'
  }]

}
export const addArticleRules = {
  title: [{
    required: true,
    min: 5,
    max: 30,
    message: '5-30个字符',
    trigger: 'blur'
  }],
  content: [
    {
      required: true,
      message: '内容必须填写',
      trigger: 'blur'
    }
  ],
  channel_id: [
    {
      required: true,
      trigger: 'blur',
      message: '频道必须选择'
    }
  ],
  cover: [
    {
      validator: (rule, value, callback) => {
        if (value.images.indexOf(undefined) > -1) {
          callback(new Error('图片数量有误'))
        }
        if (value.type === value.images.length || value.type === -1) {
          callback()
        } else {
          callback(new Error('图片数量有误'))
        }
      },
      required: true
    }
  ]
}
