<template>
  <div class="personal">
    <!-- 个人中心标题 -->
    <header class="g-header-container">
      <personal-header />
    </header>

    <!-- 购物车商品列表 -->
    <me-scroll
      scrollbar
      ref="scroll"
      class="g-content-container"
    >
      <img
        src="./personal.png"
        alt="personal"
        class="personal"
      />
    </me-scroll>

  </div>
</template>

<script>
import PersonalHeader from './header'
import MeScroll from 'base/scroll'

export default {
  name: 'cart',
  components: {
    PersonalHeader,
    MeScroll
  },
  mounted () {
    this.$refs.scroll.updateScrollBar()
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .personal {
    height: 100%;
    .g-content-container {
      padding-top: $navbar-height;
      .personal {
        width: 100%;
      }
    }
  }
</style>
