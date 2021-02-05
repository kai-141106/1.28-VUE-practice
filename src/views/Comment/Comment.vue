<template>
  <div class="article-container">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 主体表格 -->
      <el-table  :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"> </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"> </el-table-column>

        <!-- 由于后端回传的数据是数值，而我们要显示出来是对应字符串，
        所以，这里不能直接使用status -->
        <el-table-column label="评论状态" prop="comment_status">
          <template v-slot='scope'>
            <el-tag :type="scope.row.comment_status?'primary':'danger'">{{scope.row.comment_status?'正常':'关闭'}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot='scope'>
            <el-button
              size="mini"
              :type="scope.row.comment_status?'danger':'primary'"
              @click="openOrCloseFn(scope.row, !scope.row.comment_status)"
              >{{scope.row.comment_status?'关闭评论':'打开评论' }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件
        它只是根据total和page-size来显示页码，而与具体的表格数据无关

        1. total是总条数数；
        默认情况，它会以每页10条进行计算总页数
        2. current-change。当点击页码时，它会触发,会传入当前的页码。
      -->
      <el-pagination
        style="margin-top: 10px"
        background
        layout="prev, pager, next"
        @current-change='changePage'
        :current-page="reqParams.page"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { commentListAPI, openOrCloseAPI } from '@/api'
export default {
  name: 'Comment',
  data () {
    return {
      tableData: [],
      total: 0,
      reqParams: {
        page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    async getCommentListFn () {
      const [err, res] = await commentListAPI(this.reqParams)
      if (err) return
      // console.log(res)
      this.tableData = res.data.data.results
      this.total = res.data.data.total_count
      // console.log(res)
    },
    async openOrCloseFn (obj, bool) {
      // console.log(obj)

      const [err] = await openOrCloseAPI({ article_id: obj.id.toString() }, { allow_comment: bool })
      if (err) return
      this.getCommentListFn()
    },
    changePage (page) {
      this.reqParams.page = page
      // console.log(this.reqParams.page)
      this.getCommentListFn()
    }
  },
  created () {
    this.getCommentListFn()
  }
}
</script>

<style scoped lang='less'></style>
