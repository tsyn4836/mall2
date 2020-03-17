<template>
  <transition name="product" appear>
    <div class="product">
      <!-- 产品页头部 -->
      <header class="g-header-container">
        <product-header />
      </header>

      <!-- 产品页内容 -->
      <!-- 如果data是空对象(即还没从服务端获取到数据),显示加载中 -->
      <me-loading v-if="!Object.keys(data).length" />

      <!-- 从服务器获取到数据后,显示商品详情页内容 -->
      <me-scroll
        v-else scroll
        ref="scroll"
        class="g-content-container"
      >
        <product-slider :sliders="sliders" />
        <product-base-info :baseInfo="baseInfo" />
        <product-review :review="review" />
        <product-seller :seller="seller" />
      </me-scroll>
      <!-- 底部导航 -->
      <div class="g-footer-container">
        <product-bottom-bar />
      </div>
    </div>
  </transition>
</template>

<script>
import { getProductDetils } from 'api/product'
import ProductHeader from './header'
import MeScroll from 'base/scroll'
import MeLoading from 'base/loading'
import ProductSlider from './slider'
import ProductBaseInfo from './baseInfo'
import ProductReview from './review'
import ProductSeller from './seller'
import ProductBottomBar from './bottomBar'

export default {
  name: 'Product',
  components: {
    ProductHeader,
    MeScroll,
    MeLoading,
    ProductSlider,
    ProductBaseInfo,
    ProductReview,
    ProductSeller,
    ProductBottomBar
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getProductDetils(this.$route.params.id)
  },
  mounter () {
    this.$refs.scroll.updateScrollBar()
  },
  methods: {
    // 从服务器获取数据,保存在商品详情页中
    getProductDetils (id) {
      return getProductDetils(id).then(data => {
        console.log('商品详情页数据:', data)
        this.data = data
        this.sliders = data.sliders
        this.baseInfo = data.baseInfo
        this.review = data.review
        this.seller = data.seller
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .product {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;

    // 不让产品页最上面的头部遮挡住轮播图
    .g-content-container {
      padding-top: $navbar-height;
      padding-bottom: $tabbar-height;
      background-color: #f5f5f5;
    }
    .g-footer-container {
      width: 100%;
      height: $tabbar-height;
    }
    // 进出轮播图动画
    &-enter-active,
    &-leave-active {
      transition: all 0.3s;
    }
    &-enter,
    &-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    &-enter-to,
    &-leave {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
