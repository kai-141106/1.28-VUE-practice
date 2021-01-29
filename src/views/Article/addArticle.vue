<template>
  <div class="publish-container">
    <!-- 卡片模式 -->
    <el-card>
      <!-- 卡片上部 -->
      <div slot="header">
        <!-- 面包屑导航 -->
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 发布文章_表单 -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="标题" >
          <el-input v-model="article.title" ></el-input>
        </el-form-item>
        <el-form-item label="内容" >
          <el-input type="textarea" v-model="article.content" ></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1" >单图</el-radio>
            <el-radio :label="3" >三图</el-radio>
            <el-radio :label="0" >无图</el-radio>
            <el-radio :label="-1" >自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" >
          <el-select  placeholder="请选择频道" v-model="article.channel_id">
            <el-option
              v-for="item in articleArr"
              :key='item.id'
              :label="item.name"
              :value="item.id"

            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" >发表</el-button>
          <el-button >存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { articleAddAPI } from '@/api'
export default {
  name: 'articleAdd',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0
        },
        channel_id: ''
      },
      articleArr: []
    }
  },
  async created () {
    const res = await articleAddAPI()
    this.articleArr = res.data.data.channels
    // console.log(this.articleArr)
  }
}
</script>

<style lang="less" scoped >

</style>
