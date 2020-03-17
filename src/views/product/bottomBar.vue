<template>
  <div class="bottombar">
    <!-- 图标 -->
    <ul class="icons">
      <li class="icon">
        <a href="javascript:;">
          <i class="iconfont icon-shop"></i>
          <span class="icontext">店铺</span>
        </a>
      </li>
      <li class="icon">
        <a href="javascript:;">
          <i class="iconfont icon-service"></i>
          <span class="icontext">客服</span>
        </a>
      </li>
      <li class="icon">
        <a href="javascript:;">
          <i class="iconfont icon-collect"></i>
          <span class="icontext">收藏</span>
        </a>
      </li>
    </ul>
    <!-- 加入购物车/购买 -->
    <div class="addCartAndBuy">
      <a class="addCart" href="javascript:;">加入购物车</a>
      <a class="buy" href="javascript:;">马上抢</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductBottomBar'
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .bottombar {
    background-color: #fff;
    height: 100%;
    width: 100%;
    @include flex-start();
    .icons {
      @include flex-around();
      width: 50%;
      .icon a {
        @include flex-center(column);
        line-height: 1.4;
        .iconfont {
          transform: scale(1.3);
        }
      }
    }
    .addCartAndBuy {
      @include flex-start();
      width: 50%;
      height: 100%;
      a {
        display: block;
        height: 100%;
        width: 50%;
        text-align: center;
        line-height: $tabbar-height;
        color:#eee;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 0 0 1px #eee;
      }
      a.addCart {
        background-color: #ff9500;
      }
      a.buy {
        background-color: #ff0036;
      }
    }
  }
</style>
