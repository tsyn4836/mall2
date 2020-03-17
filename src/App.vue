<template>
  <!-- 页面容器 -->
  <div id="app" class="g-container">
    <!-- 主视图容器 -->
    <div class="g-view-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 底部导航条容器 -->
    <div class="g-footer-container">
      <c-tabbar />
    </div>
  </div>
</template>

<script>
import CTabbar from './components/tabbar'
export default {
  name: 'App',
  components: {
    CTabbar
  }
}
</script>
