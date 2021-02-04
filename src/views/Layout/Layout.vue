<template>

<el-container class="layout-container">
  <el-aside :width=" wid ? '200px':'64px'" class="aside">
         <!-- 5. 左侧导航部分 -->
      <div class="logo" :class="{minLogo:!wid}"></div>
      <!-- 菜单区域(默认激活的是/layout/home) -->
      <el-menu
       router
        :default-active="$route.path"
        class="nav-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!wid"
        :collapse-transition="false"
      >
        <el-menu-item index="/layout/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/layout/articleList">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/addArticle">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/layout/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/fans">
          <i class="el-icon-setting"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
  </el-aside>
  <el-container>
    <el-header class="header">
              <!-- 7. 准备右侧header内的标签 -->
      <div>
        <i class="el-icon-s-fold" @click="shenSuoFn"></i>
        <span>江苏传智播客科技教育有限公司</span>
      </div>

      <el-dropdown>
        <!-- 默认插槽：用来显示触发开关 -->
        <div class="avatar-wrap">
          <img
            class="avatar"
            :src="photo"
            alt=""
          />
          <span>{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>

          <!--具名插槽slot名：用来显示下拉内容 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native='quit'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import { userInfoAPI } from '@/api/index'
export default {
  data () {
    return {
      wid: true,
      name: '',
      photo: ''
    }
  },
  methods: {
    shenSuoFn () {
      // console.log(1)
      this.wid = !this.wid
    },
    quit () {
      sessionStorage.clear()
      this.$router.replace('/login')
    }
  },
  async created () {
    const res = await userInfoAPI()
    // console.log(res)
    this.name = res.data.data.name
    this.photo = res.data.data.photo
    this.$eventBus.$on('photourl', (url) => {
      // console.log(url)
      this.photo = url
    })
    this.$eventBus.$on('username', (name) => {
      // console.log(name)
      this.name = name
    })
  }
}
</script>

<style lang="less" scoped>
/* 4. 外层的容器占满整个页面*/
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
   background-color: #002033;
  .el-menu {
    border-right: none;
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/logo_admin.png) no-repeat center /
      140px auto;
  }
 // 覆盖background 的图片和大小，类书写在logo的下方。
  .minLogo {
    background-image: url(../../assets/logo_admin_01.png);
    background-size: 36px auto;
  }
}
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
