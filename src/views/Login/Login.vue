<template>
  <!-- 自己写的样式名login-container -->
  <div class="login-container">
    <!-- 登录窗口 -->
    <div class="login-form-wrap">
      <!-- 第一行: logo -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="form" :model="form" :rules="rules">
          <el-form-item prop='mobile'>
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>

          <el-form-item prop='code'>
            <el-input v-model="form.code"></el-input>
          </el-form-item>

          <el-form-item prop='check'>
              <el-checkbox v-model="form.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>

  <el-form-item>
    <el-button type="primary" class="login-btn" @click='loginFn' :loading="load">登录</el-button>
  </el-form-item>
</el-form>

  </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { loginRules } from '@/verify'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        check: false
      },
      load: false,
      rules: loginRules
    }
  },
  methods: {
    loginFn () {
      this.$refs.form.validate(async valid => { // form检验各种规则, valid有false代表验证失败
        if (!valid) return
        this.load = true
        const res = await loginAPI(this.form)
        // console.log(res)
        sessionStorage.setItem('token', res.data.data.token)
        this.load = false
        this.$message.success('登录成功')
        this.$router.push('/layout')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 铺满整屏和表单的额外样式
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
  .el-button--primary{
    width: 100%;
  }
}
</style>
