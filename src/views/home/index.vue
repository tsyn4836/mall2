<template>
  <!-- 首页 -->
  <div class="home">
    <!-- 首页头部 -->
    <header class="g-header-container">
      <home-header
        :class="{ 'header-transition': isHeaderTransition }"
        ref="header"
      />
    </header>

    <!-- 首页内容 -->
    <me-scroll
      class="g-content-container"
      ref="scroll"
      scrollbar
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll-end="scrollEnd"
      @scroll="scroll"
      @pull-down-transition-end="pullDownTransitionEnd"
    >
      <home-slider ref="slider" />
      <home-nav />
      <home-recommend @update-scrollbar="updateScrollBar" ref="recommend" />
    </me-scroll>

    <!-- 首页的返回顶部按钮 -->
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop" />
    </div>

    <!-- 首页的产品路由视图 -->
    <router-view />
  </div>
</template>

<script>
import HomeHeader from './header'
import MeScroll from 'base/scroll'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import MeBacktop from 'base/backtop'
import { HEADER_TRANSITION_HEIGHT } from './config'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    MeScroll,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeBacktop
  },
  data () {
    return {
      recommends: [],
      isBacktopVisible: false,
      isHeaderTransition: false
    }
  },
  methods: {
    // 更新滚动条
    updateScrollBar () {
      this.$refs.scroll.updateScrollBar()
    },
    // 下拉刷新banner
    pullToRefresh (end) {
      this.$refs.slider
        .update() // 刷新banner
        .then(end) // 让下拉在某高度的页面恢复原状
      console.log('下拉刷新banner')
    },
    // 上拉加载更多
    pullToLoadMore (end) {
      console.log('上拉加载更多')
      this.$refs.recommend
        .update()
        .then(end)
        .catch(err => {
          if (err) {
            console.log(err)
          }
          end()
          // 处理没有更多数据的情况
          // 禁止继续加载更多数据
          // 替换上拉时的loading,改为没有更多数据了
        })
    },
    // 返回顶部
    backToTop () {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },
    // 滚动的过渡动画结束时，判断按钮的位置
    scrollEnd (translate, scroll, pulling) {
      // 当页面往下拉，同时下拉距离超过一屏时，显示返回顶部按钮
      this.isBacktopVisible = translate < 0 && -translate > scroll.height
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
    },
    scroll (translate) {
      this.changeHeaderStatus(translate)
    },
    pullDownTransitionEnd () {
      this.$refs.header.show()
    },
    // 修改头部状态
    changeHeaderStatus (translate) {
      // 下拉时隐藏
      if (translate > 0) {
        this.$refs.header.hide()
        return
      }
      // 上拉时显示
      this.$refs.header.show()
      // 上拉距离大于某一长度时，hedaer变成半透明
      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
