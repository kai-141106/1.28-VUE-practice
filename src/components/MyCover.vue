<!-- 内容管理/发布文章/封面组件 -->
<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <img :src="coverImageUrl" />
    </div>
    <!-- 对话框
    append-to-body为true, 弹出层显示在body之上
    visible 是否显示dialog(弹出层), sync作用子组件可以修改后面变量的值
     -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
                   <!-- 菜单 -->
          <div style="padding-bottom: 20px">
            <el-radio-group  size="mini" v-model="radioType">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <!-- 分栏布局
              :gutter  栅格间隔
              :xs <768px 响应式栅格数或者栅格属性对象
              :sm ≥768px 响应式栅格数或者栅格属性对象
              :md ≥992px 响应式栅格数或者栅格属性对象
              :lg ≥1200px 响应式栅格数或者栅格属性对象
             -->
          <el-row :gutter="10" class="img_list">
            <el-col
              class="img_item"
              :xs="12"
              :sm="6"
              :md="6"
              :lg="4"
               v-for="item in imgListArr"
              :key="item.id"
              @click.native="selectedFn(item)"
            >
              <!-- 确定图片如何适应容器框fit:cover -->
              <el-image
                style="height: 100px"
                :src="item.url"
                fit="cover"
                :class="{selected: selectImgUrl === item.url}"
              ></el-image>
            </el-col>
          </el-row>
          <!-- 分页组件 prev上一页, next下一页按钮, pager页码, total分页数 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change='changePage'
            :current-page = 'reqParmas.page'
          >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="upload">
          <el-upload
                class="upload-demo"
                action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
                :headers="headers"
                name='image'
                :show-file-list='false'
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=" confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { imgListAPI } from '@/api'
import defaultPng from '@/assets/default.png' // 因为项目底层都是用webpack打包的assets图片, 转成base64字符串, 所以需要引入使用
// console.log(defaultPng)s
export default {
  name: 'MyCover',
  data () {
    return {
      coverImageUrl: defaultPng, // 确认选择的图片地址
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      radioType: '全部', // 全部收藏的高亮
      reqParmas: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      imgListArr: [], // 存请求回来的图片
      selectImgUrl: '', // 存选中的图片的url地址
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      imageUrl: ''// 上传成功的地址

    }
  },
  props: {
    index: Number,
    value: String
  },
  watch: {
    radioType (newVal) {
      this.reqParmas.page = 1
      // if (newVal === '全部') {
      //   this.reqParmas.collect = false
      // } else if (newVal === '收藏') {
      //   this.reqParmas.collect = true
      // }
      this.reqParmas.collect = this.radioType !== '全部'
      this.getUserImgFn()
    },
    value: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.coverImageUrl = newVal
        }
      }
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('图片只能是 JPG 格式 / PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M // 如果返回true就开始上传
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.url
      this.getUserImgFn()
    },
    openDialog () {
      this.dialogVisible = true
      this.selectImgUrl = this.coverImageUrl
    },
    async getUserImgFn () {
      const res = await imgListAPI(this.reqParmas)
      this.imgListArr = res.data.data.results
      this.total = res.data.data.total_count
    },
    async changePage (page) {
      this.reqParmas.page = page
      this.getUserImgFn()
    },
    selectedFn (obj) {
      if (this.selectImgUrl && this.selectImgUrl === obj.url) {
        this.selectImgUrl = defaultPng
      } else {
        this.selectImgUrl = obj.url
      }
    },
    confirmFn () {
      this.dialogVisible = false
      this.coverImageUrl = this.selectImgUrl
      if (this.coverImageUrl === defaultPng) {
        this.$emit('coverimg', false, this.index)
      } else {
        this.$emit('coverimg', this.coverImageUrl, this.index)
      }
    }
  },

  async created () {
    this.getUserImgFn()
  }
}
</script>

<style scoped lang='less'>
/* 图片按钮 */
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
/* 素材列表 */
.img_list {
  margin-top: 15px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
/* 素材列表 */
.img_item {
  position: relative;
}
/* 选中样式 */
.selected::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
    50px 50px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
