<template>
  <div class="seller">
    <!-- 店家 -->
    <div class="shop">
      <div class="shopIcon">
        <img :src="seller.shopIcon" alt="shopIcon" />
      </div>
      <div class="shopName">
        <h3 class="shopName">{{ seller.shopName }}</h3>
        <img :src="seller.creditLevelIcon" class="creditLevelIcon" />
      </div>
    </div>
    <!-- 店家评分 -->
    <ul class="evaluates">
      <li
        v-for="(item,index) in seller.evaluates"
        :key="index"
        class="evaluate"
      >
        <span class="title">{{item.title}}</span>
        <span class="score">{{item.score}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductSeller',
  props: {
    seller: {
      type: Object
    }
  }
  // mounted () {
  //   console.log('seller', this.seller)
  // }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .seller {
    margin-top: 10px;
    background-color: #fff;
    padding:15px;
    .shop {
      @include flex-start();
      .shopIcon {
        border: solid 1px $border-color;
        width: 50px;
        height: 50px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .shopName {
        @include flex-center(column);
        align-items: start;
        margin-left:5px;
        .creditLevelIcon {
          // width: 50px;
          height:15px;
          border-radius: 5px;
          margin-top: 5px;
          margin-left: 5px;
        }
      }
    }
    .evaluates {
      @include flex-around();
      margin-top:15px;
      color:#999;
    }
  }
</style>
