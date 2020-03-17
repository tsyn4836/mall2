<template>
  <me-navbar class="header" title="购物车">
    <!-- 右侧消息图标 -->
    <i slot="right" class="iconfont icon-msg"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from 'base/navbar'
export default {
  name: 'CartHeader',
  components: {
    MeNavbar
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

      // & /deep/ .mine-navbar-text {
      //   color:#333;
      // }
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }

</style>
