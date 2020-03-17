<template>
  <div class="slider-wrapper">
    <!-- 若轮播图没有东西，则显示加载中 -->
    <me-loading v-if="!sliders.length"/>
    <!-- 轮播图 -->
    <me-slider
      v-else
      :sliders="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
    >
      <!-- 轮播图的每一项 -->
      <swiper-slide
        v-for="(item, index) in sliders"
        :key="index"
      >
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" class="slider-img" />
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeLoading from 'base/loading'
import MeSlider from 'base/slider'
import { swiperSlide } from 'vue-awesome-swiper'
import { sliderOptions } from './config'
import { getHomeSlider } from 'api/home'
export default {
  name: 'HomeSlider',
  components: {
    MeLoading,
    MeSlider,
    swiperSlide
  },
  // 本组件的所有Attribute属性来自于同目录的config.js文件
  data () {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: sliderOptions.sliders
    }
  },
  // 轮播图内容在初始化时从后台接口获取,src/api/home.js
  methods: {
    update () {
      return this.getSliders()
    },
    getSliders () {
      return getHomeSlider().then(data => {
        this.sliders = data
      })
    }
  },
  created () {
    this.getSliders()
  }
}
</script>

<style lang="scss" scoped>

  .slider-wrapper {
    width: 100%;
    height: 183px;
  }

  .slider-link {
    display: block;
  }

  .slider-link,
  .slider-img {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

</style>
