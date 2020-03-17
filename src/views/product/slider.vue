<template>
  <!-- 轮播图为横向铺满屏幕的正方形 -->
  <div class="square slider">
    <!-- 轮播图 -->
    <me-slider
      :sliders="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
    >
      <swiper-slide
        v-for="(item, index) in sliders"
        :key="index"
      >
        <a
          class="slider-link"
          :href="item"
          @click.prevent
        >
          <img :src="item" class="slider-img" />
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeSlider from 'base/slider'
import { swiperSlide } from 'vue-awesome-swiper'
import { sliderOptions } from './config'

export default {
  name: 'ProductSlider',
  components: {
    MeSlider,
    swiperSlide
  },
  props: {
    sliders: {
      type: Array,
      dafault: []
    }
  },
  data () {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .square {
    @include square();

  }

  .slider-link {
      display: block;

      &,
      .slider-img {
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
    }
</style>
