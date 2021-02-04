<template>
  <div class="setting-container">
    <el-card>
      <!-- 导航 -->
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px" :model="user">
            <el-form-item label="编号：">{{ user.id}}</el-form-item>
            <el-form-item label="手机：">{{user.mobile}}</el-form-item>
            <el-form-item label="用户名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="用户简介：">
              <el-input
                type="textarea"
                v-model="user.intro"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" @click="updateInfoFn">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性-->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request='updateAvatar'
            :show-file-list='false'
          >
            <img class="avatar" v-if="user.photo" :src="user.photo"/>
            <i v-if="!user.photo" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { userInfoAPI, updateUserInfoAPI, updateAvatarAPI } from '@/api'
export default {
  name: 'settings',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async getuserInfoFn () {
      const res = await userInfoAPI()
      this.user = res.data.data
    },
    async updateInfoFn () {
      await updateUserInfoAPI(this.user)
      this.$message.success('个人信息更新成功')
      // console.log(res)
      this.$eventBus.$emit('username', this.user.name)
      this.getuserInfoFn()
    },
    async updateAvatar (fileObj) {
      const fd = new FormData()
      fd.append('photo', fileObj.file)
      const res = await updateAvatarAPI(fd)
      this.user.photo = res.data.data.photo
      this.$message.success('头像更新成功')
      this.$eventBus.$emit('photourl', this.user.photo)
      this.getuserInfoFn()
    }
  },
  async created () {
    this.getuserInfoFn()
  }
}
</script>

<style scoped lang='less'>
.avatar {
  width: 178px;
  height: 178px;
  line-height: 178px;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.edit-photo {
  font-size: 12px;
  text-align: center;
}
</style>
