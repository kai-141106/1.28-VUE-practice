<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom: 20px">
        <el-radio-group size="mini" v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
              <el-button
          @click="dialogVisible = true"
          type="success"
          size="mini"
          style="float: right;margin-top:-50px"
          >上传图片素材
        </el-button>
      <!-- 素材列表 -->
<el-row :gutter="10">
        <el-col class="img_item" :xs="12" :sm="6" :md="6" :lg="4" v-for="item in listArr"
            :key="item.id">
          <el-image
            style="height: 180px; width: 100%"
            :src="item.url"
            fit="cover"

          ></el-image>
          <div class="option">
            <span class="el-icon-star-on" :style="{color:item.is_collected ?'red':''}" @click="collectFn(item)"></span>
            <span class="el-icon-delete" @click="delImg(item)"></span>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
            <!-- 分页 -->
      <el-pagination
        style="margin-top: 10px"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[8, 12, 16, 20]"
        @current-change="hPageChange"
        @size-change="handleSizeChange"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
      >
      </el-pagination>
            <!-- 对话框 -->
      <el-dialog
        title="提示"
        :append-to-body="true"
        :visible.sync="dialogVisible"
      >
        <span>上传图片</span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { imgListAPI, collectedImgAPI, imgDelAPI } from '@/api'
export default {
  name: 'images',
  data () {
    return {
      dialogVisible: false,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      listArr: [],
      radio1: '全部',
      total: 0
    }
  },
  watch: {
    radio1 (newVal) {
      this.reqParams.page = 1
      this.reqParams.collect = (newVal !== '全部')
      this.getImgListFn()
      // if (newVal===全部) {
      // }
    }
  },
  methods: {
    async getImgListFn () {
      const res = await imgListAPI(this.reqParams)
      // console.log(res)
      this.listArr = res.data.data.results
      this.total = res.data.data.total_count
    },
    async collectFn (obj) {
      this.reqParams.page = 1
      await collectedImgAPI(obj.id, { collect: !obj.is_collected })
      // console.log(res)
      this.getImgListFn()
    },
    hPageChange (page) {
      this.reqParams.page = page
      this.getImgListFn()
    },
    handleSizeChange (val) {
      // console.log(val)
      this.reqParams.per_page = val
      this.getImgListFn()
    },
    delImg (obj) {
      this.$confirm('确定删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await imgDelAPI(obj.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getImgListFn()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },

  async created () {
    this.getImgListFn()
  }
}
</script>

<style scoped lang="less">
 .img_item {
    position: relative;
    box-sizing: border-box;
  }
  .option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
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
</style>
