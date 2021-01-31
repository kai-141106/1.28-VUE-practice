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

}
