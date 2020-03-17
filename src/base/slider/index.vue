<template>
  <swiper :options="swiperOption" :key="keyId">
    <!-- 插槽里填写滑动项的内容 -->
    <slot>
      <!--<swiper-slide v-for="item in sliders">-->
      <!--<a href="">-->
      <!--<img src="" alt=""/>-->
      <!--</a>-->
      <!--</swiper-slide>-->
    </slot>

    <!-- 分页器 -->
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper } from 'vue-awesome-swiper'
export default {
  name: 'MeSlider',
  components: {
    swiper
  },
  // 定义该基础组件的调用元素的Attribute
  props: {
    // 轮播方向
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return [
          'horizontal',
          'vertical'
        ].indexOf(value) > -1
      }
    },
    // 自动轮播的时间间隔
    interval: {
      type: Number,
      default: 3000,
      validator (value) {
        return value >= 0
      }
    },
    // 无缝滚动
    loop: {
      type: Boolean,
      default: true
    },
    // 分页器
    pagination: {
      type: Boolean,
      default: true
    },
    // 轮播图数据
    sliders: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      keyId: Math.random()
    }
  },
  watch: {
    sliders (newData) {
      if (newData.length === 0) {
        return
      }
      this.swiperOption.loop = newData.length === 1 ? false : this.loop
      this.keyId = Math.random()
    }
  },
  methods: {
    init () {
      // SwiperOption里的键值对是Swiper组件需要的,由调用本组件的父组件的Attribute属性传到本组件的data,再由data传到Swiper的Attribute
      this.swiperOption = {
        watchOverflow: true,
        direction: this.direction,
        autoplay: this.interval ? {
          delay: this.interval,
          disableOnInteraction: false
        } : false,
        slidesPerView: 1,
        loop: this.sliders.length <= 1 ? false : this.loop,
        pagination: {
          el: this.pagination ? '.swiper-pagination' : null
        }
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
