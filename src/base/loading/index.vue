<template>
  <div
    class="mine-loading"
    :class="{'mine-loading-inline': inline}"
  >
    <!-- 加载中的图片 -->
    <span
      class="mine-loading-indicator"
      v-if="indicator==='on'"
    >
      <!-- 通过插槽可以自定义加载中的图片是什么，默认是loading.gif -->
      <slot>
        <img src="./loading.gif" alt="loading">
      </slot>
    </span>

    <!-- 加载中的文字 -->
    <span class="mine-loading-text"
      v-if="loadingText"
    >
      {{loadingText}}
    </span>

  </div>
</template>

<script>
export default {
  name: 'MeLoading',
  props: {
    // 是否显示加载中的图片
    indicator: {
      type: String,
      default: 'on',
      validator (value) {
        return ['on', 'off'].indexOf(value) > -1
      }
    },
    // 图片和文字是水平排列还是垂直排列,默认垂直排列
    inline: {
      type: Boolean,
      default: false
    },
    // 加载中的默认文字，只作为父组件传参的中介，真正用于渲染的是loadingText
    text: {
      type: String,
      default: '加载中...'
    }
  },
  data () {
    return {
      loadingText: this.text
    }
  },
  watch: {
    text (text) {
      this.loadingText = text
    }
  },
  methods: {
    // 暴露到外部的修改载入文本的方法
    setText (text = this.text) {
      this.loadingText = text
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-loading {
    overflow: hidden;
    width: 100%;
    height: 100%;
    @include flex-center(column);

    &.mine-loading-inline {
      flex-direction: row;

      .mine-loading-indicator ~ .mine-loading-text {
        margin-top: 0;
        margin-left: 6px;
      }
    }
    &-indicator ~ &-text {
    margin-top: 6px;
  }
  }

</style>
