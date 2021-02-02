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
      <el-form ref="form" label-width="80px" :rules="rules" :model="article">
        <el-form-item label="标题" prop="title" >
          <el-input v-model="article.title" ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content" ></el-input> -->
          <quillEditor v-model="article.content" :options="editorOption"></quillEditor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1" >单图</el-radio>
            <el-radio :label="3" >三图</el-radio>
            <el-radio :label="0" >无图</el-radio>
            <el-radio :label="-1" >自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" prop="channel_id">
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
              <my-cover></my-cover>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createFn(false)" :loading='load' >发表</el-button>
          <el-button  @click="createFn(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { channelListAPI, articleAddAPI, articleByIdAPI, articleUpdateAPI } from '@/api'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import MyCover from '@/components/MyCover.vue'

export default {
  name: 'articleAdd',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      articleArr: [],
      editorOption: {
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗, 斜体, 下划线, 删除线
            ['blockquote', 'code-block'], // 双引号和代码
            [{ header: 1 }, { header: 2 }], // h几字体图标
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表, 无序列表
            [{ indent: '-1' }, { indent: '+1' }], // 缩进-1, 缩进+1 按钮
            ['image'] // 图片插件
          ]
        }
      },
      load: false,
      rules: {
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
        ]
      },
      articleId: -1
    }
  },
  async created () {
    const res = await channelListAPI()
    this.articleArr = res.data.data.channels
    // console.log(this.articleArr)
    // 判断 是否有id
    if (this.$route.query.id) {
      this.articleId = this.$route.query.id
      // console.log(articleId)
      const artres = await articleByIdAPI(this.articleId)
      // console.log(res)t
      this.article = artres.data.data
    }
  },
  methods: {
    async createFn (bool) {
      // console.log(this.article)
      this.$refs.form.validate(async valid => { // form检验各种规则, valid有false代表验证失败
        if (!valid) return
        this.load = true
        // 等于1 就证明 不是更新文章 是新增
        if (this.articleId === -1) {
          await articleAddAPI({ draft: bool }, this.article)
          if (bool === false) {
            this.$message({
              message: '文章发表成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '存入草稿成功',
              type: 'success'
            })
          }
          // 清空表单内容
          Object.assign(this.article, this.$options.data().article)
        } else { // 不是1 就证明要更新文章
          await articleUpdateAPI(this.articleId, { draft: bool }, this.article)
          if (bool === false) {
            this.$message({
              message: '此文章编辑成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '存入草稿成功',
              type: 'success'
            })
          }
          this.$router.push('/layout/articleList')
        }
        this.load = false
      })
    }
  },
  components: {
    quillEditor,
    MyCover
  }
}
</script>

<style lang="less" scoped >
    .publish-container /deep/ .ql-editor {
      height: 300px;
    }
    .publish-container /deep/ .ql-toolbar.ql-snow {
      padding: 0 8px;
    }
</style>
