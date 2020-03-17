<template>
  <!-- 滚动条容器 -->
  <swiper ref="swiper"
    :options="swiperOption"
  >
    <!-- 下拉刷新 -->
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading inline :text="pullDownText" ref="pullDownLoading" />
    </div>

    <!-- 滚动条内容 -->
    <swiper-slide>
      <slot></slot>
    </swiper-slide>

    <!-- 上拉加载更多 -->
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading inline :text="pullUpText" ref="pullUpLoading" />
    </div>

    <!-- 滚动条 -->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>

  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MeLoading from 'base/loading'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from './config'

export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: false
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.pulling = false // 是否正在拉取数据中
      this.pullDownText = PULL_DOWN_TEXT_INIT
      this.pullUpText = PULL_UP_TEXT_INIT
      this.swiperOption = {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true
        },
        // Swiper组件内置的事件监听
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd // 滑动的过渡效果停止时，触发滚动停止事件
        }
      }
    },
    // 更新滚动条
    updateScrollBar () {
      // console.log('更新滚动条')
      // setTimeout(() => {
      // this.$refs.swiper && this.$refs.swiper.swiper.update()
      // }, 0)
      this.$nextTick(() => {
        this.$refs.swiper && this.$refs.swiper.swiper.update()
      })
    },
    // 滚动页面时,修改下拉和上拉loading的文字
    scroll () {
      const swiper = this.$refs.swiper.swiper
      // console.log(swiper.translate)
      // 向外散布它在滚动中
      this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper)
      // 如果页面正在拉动数据,则禁止修改loading的文字
      if (this.pulling) {
        return
      }
      // console.log(swiper.translate)
      // 滚动条下拉
      if (swiper.translate > 0) {
        // 如果没有设置下拉效果，那就返回
        if (!this.pullDown) {
          return
        }
        // 下拉超过一定阈值
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          /* // this.pullDownText = PULL_DOWN_TEXT_START
            // 这里不能直接修改this.pullDownText的值，因为它的变化会造成子组件pullDownLoading的重新渲染，造成显示上的问题。这里通过调用子组件pullDownLoading的方法setText修改子组件的数据loadingText。父组件的Attribute属性text恒为this.pullDownText，即初始的PULL_DOWN_TEXT_INIT
          */
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      } else if (swiper.isEnd) { // 滚动条上拉
        if (!this.pullUp) {
          return
        }

        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'))

        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START)
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT)
        }
      }
    },
    // 手离开屏幕时
    touchEnd () {
      if (this.pulling) {
        return
      }
      const swiper = this.$refs.swiper.swiper

      // 如果下拉距离超过一定阈值,则触发pull-down事件
      if (swiper.translate > PULL_DOWN_HEIGHT) { // 下拉
        if (!this.pullDown) {
          return
        }
        // 页面正在拉取数据
        this.pulling = true
        swiper.allowTouchMove = false// 禁止触摸
        swiper.setTransition(swiper.params.speed)// 下拉过渡效果的速度
        swiper.setTranslate(PULL_DOWN_HEIGHT)// 下拉到某个距离
        swiper.params.virtualTranslate = true// 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)// 文字修改为下拉中
        // 触发pull-down事件,并把this.pullDownEnd函数传过去,以便在拉取到数据后恢复页面的状态
        this.$emit('pull-down', this.pullDownEnd)
      } else if (swiper.isEnd) { // 底部
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight
        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return
          }
          this.pulling = true
          swiper.allowTouchMove = false // 禁止触摸
          swiper.setTransition(swiper.params.speed)
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height))
          swiper.params.virtualTranslate = true // 定住不给回弹
          // 触发pull-up事件,并把this.pullUpEnd函数传过去,以便在拉取到数据后恢复页面的状态
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING)
          this.$emit('pull-up', this.pullUpEnd)
        }
      }
    },
    // 下拉结束时恢复初始状态
    pullDownEnd () {
      // 拉取结束了
      this.pulling = false

      const swiper = this.$refs.swiper.swiper
      // 恢复初始状态
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0)
      // 拉取结束后，向外触发下拉的过渡效果已经结束的事件（用于显示搜索框）
      // setTimeout(() => {
      //   this.$emit('pull-down-transition-end')
      // }, swiper.params.speed)
    },
    // 上拉结束时恢复初始状态
    pullUpEnd () {
      const swiper = this.$refs.swiper.swiper
      this.pulling = false
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
    },
    // 返回第一个幻灯片,即返回顶部
    scrollToTop (speed, runCallbacks) {
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks)
      // console.log('返回顶部')
    },
    // 滚动停止时，向外告知（用于显示返回顶部按钮）
    scrollEnd () {
      const swiper = this.$refs.swiper.swiper
      this.$emit('scroll-end', swiper.translate, swiper, this.pulling)
    }
  }

}
</script>

<style lang="scss" scoped>
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  };

  .swiper-slide {
    height: auto;
  }
  .mine-scroll-pull-up,
  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }

  .mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>
