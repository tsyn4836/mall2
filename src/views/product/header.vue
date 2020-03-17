<template>
  <me-navbar
    title="商品详情"
    class="header"
  >
    <!-- 左侧返回图标 -->
    <i
      slot="left"
      class="iconfont icon-back"
      @click="goBack"
    ></i>
    <!-- 右侧购物车图标 -->
    <i slot="right" class="iconfont icon-cart"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from 'base/navbar'
export default {
  name: 'ProductHeader',
  components: {
    MeNavbar
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
      // background-color: transparent;
      transition: background-color 0.5s;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
