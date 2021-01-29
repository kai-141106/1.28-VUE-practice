<template>
  <div>
    <img src="../../assets/404.png" alt="访问的网页不存在" @click="btn">
  </div>
</template>

<script>
export default {
  methods: {
    btn () {
      sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    width: 100%;
  }
</style>
