<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in list" :key="item.id">
              <el-avatar
                :size="80"
                :src="item.photo"
              ></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { fansListAPI } from '@/api'
export default {
  name: 'fans',
  data () {
    return {
      activeName: 'list',
      list: []
    }
  },
  methods: {
    async getFansListAPI () {
      const res = await fansListAPI()
      // console.log(res)
      this.list = res.data.data.results
    }
  },
  created () {
    this.getFansListAPI()
  }
}
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
