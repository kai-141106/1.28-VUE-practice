<template>
  <div class="article-container">
    <!-- 卡片布局 -->
    <el-card class="box-card">
      <!-- 头部- div作为header的具名插槽插入el-card组件内-顶部一条 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 卡片布局-表单 -->
      <el-form ref="form" label-width="80px">
        <!-- 第一行 -->
        <el-form-item label="状态" :model='form'>
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 第二行 -->
        <el-form-item label="频道">
            <el-select placeholder="请选择频道" v-model="form.channel_id">
            <el-option label="全部" :value="null" ></el-option>
            <el-option v-for="item in channelArr" :key="item.id" :value="item.id" :label="item.name" ></el-option>
          </el-select>
        </el-form-item>
        <!-- 第三行 -->
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="form.begin_pubdate"
              placeholder="开始日期"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="form.end_pubdate"
              placeholder="结束时间"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFn" :loading='load'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 卡片布局-下面内容区域 -->
    <el-card style="margin-top: 20px">
      <!-- 卡片头部导航 -->
      <div slot="header" class="clearfix">根据筛选条件查询到{{total}}条数据：</div>
      <!-- 卡片正文表格
        data对应 数据数组(里面都得是对象格式)
        prop: 对应对象的哪个key-值会显示在当前单元格里
       -->
      <el-table :data="tableData" style="width: 100%" v-loading='load'>
        <el-table-column prop="cover" label="封面" width="180">
          <template v-slot='scope'>
            <el-image style="width: 150px; height: 100px" lazy :src="scope.row.cover.images[0]" fit="cover"></el-image>
          </template>

        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot='scope'>
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status===1" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
           </el-table-column>
        <el-table-column prop="pubdate" label="时间"> </el-table-column>
        <el-table-column prop="" label="操作">
          <template v-slot='scope'>
            <el-button type="primary" icon="el-icon-edit"  circle @click="hEdit(scope.$index, scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="hDelete(scope.$index, scope.row)"></el-button>
          </template>
           </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change='changePage'
        :disabled='load'
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { channelListAPI, articleListAPI, articleDeleteAPI } from '@/api/index.js'
export default {
  name: 'articleList',
  data () {
    return {
      form: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      channelArr: [],
      tableData: [],
      total: 0,
      load: false
    }
  },
  async created () {
    const res = await channelListAPI()
    // console.log(res)
    this.channelArr = res.data.data.channels

    this.getArticleListFn()
  },
  methods: {
    searchFn () {
      this.getArticleListFn()
    },
    hEdit (index, obj) {
      console.log(obj.id)
      // 跳转到 发布页面  编辑与其用的一个组件 把文章的id传过去
      this.$router.push({
        path: '/layout/addArticle',
        query: {
          id: obj.id
        }
      })
    },
    hDelete (index, obj) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await articleDeleteAPI(obj.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticleListFn()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changePage (page) {
      this.form.page = page
      // console.log(this.form.page)
      this.getArticleListFn()
    },
    async getArticleListFn () {
      this.load = true
      // 获取文章列表
      const articleListRes = await articleListAPI(this.form)

      this.tableData = articleListRes.data.data.results
      this.total = articleListRes.data.data.total_count
      // console.log(articleListRes)
      this.load = false
    }
  }
}
</script>

<style scoped lang='less'>
/deep/ .cell {
  text-align: center;
}
</style>
