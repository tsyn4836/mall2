<template>
  <div class="cart">
    <!-- 购物车标题 -->
    <header class="g-header-container">
      <cart-header />
    </header>

    <!-- 购物车商品列表 -->
    <me-scroll
      scrollbar
      ref="scroll"
      class="g-content-container"
    >
      <img
        src="./cart.png"
        alt="购物车列表"
        class="cart-list"
      />
    </me-scroll>

  </div>
</template>

<script>
import CartHeader from './header'
import MeScroll from 'base/scroll'

export default {
  name: 'cart',
  components: {
    CartHeader,
    MeScroll
  },
  mounted () {
    this.$refs.scroll.updateScrollBar()
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .cart {
    height: 100%;
    .g-content-container {
      padding-top: $navbar-height;
      .cart-list {
        width: 100%;
      }
    }
  }
</style>
