<template>
  <div class="category">
    <!-- 分类页头部 -->
    <header class="g-header-container">
      <category-header/>
    </header>
    <!-- 分类页内容 -->
    <div class="g-content-container">
      <!-- 分类页侧边栏 -->
      <div class="sidebar">
        <category-tab @switch-tab="getCurId"/>
      </div>
      <!-- 分类页主内容 -->
      <div class="main">
        <category-content :curId="curId"/>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryHeader from './header'
import CategoryTab from './tab'
import CategoryContent from './content'

export default {
  name: 'Category',
  components: {
    CategoryHeader,
    CategoryTab,
    CategoryContent
  },
  data () {
    return {
      curId: ''
    }
  },
  methods: {
    getCurId (id) {
      this.curId = id
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .category {
    overflow:hidden;
    width:100%;
    height:100%;
    background-color: $bgc-theme;
  }

  .g-content-container {
    display: flex;
  }
  .sidebar {
    width: 80px;
    height: 100%;
  }
  .main {
    flex: 1;
    height: 100%;
  }
</style>
