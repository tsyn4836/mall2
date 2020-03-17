<template>
  <div class="baseinfo">
    <!-- 价格、销售量 -->
    <div class="line line1">
      <span class="price">{{ baseInfo.price }}</span>
      <span class="soldCount">{{ baseInfo.soldCount }}</span>
    </div>
    <!-- 商品名 -->
    <div class="line line2">
      <span class="title">{{ baseInfo.title }}</span>
    </div>
    <!-- 快递费、发货地址 -->
    <div class="line line3">
      <span class="postage">{{ baseInfo.postage }}</span>
      <span class="sellCount">{{ baseInfo.sellCount }}</span>
      <span class="from">{{ baseInfo.from }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductBaseInfo',
  props: {
    baseInfo: {
      default: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .baseinfo {
    margin-bottom: 10px;
    background-color: #fff;

    .line {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px;

    &.line1 {
      height: 44px;
      background-color: #ef3390;
      background-image: linear-gradient(to right, #ef3390, #ef3649);
      color: #fff;
      border-top:2px solid $border-color;
      border-bottom: 2px solid $border-color;
      // box-shadow: $border-color 5px 5px 5px 5px;

      .price {
        font-size: 20px;

        &::before {
          content: "￥";
          font-size: 0.6em;
        }
      }

      .soldCount {
        display: inline-block;
        padding: 8px 14px;
        border-radius: 5px;
        background-color: #cc2e3f;

        &::after {
          content: "件已售";
        }
      }
    }

    &.line2 {
      .title {
        @include multiline-ellipsis(2);
        color:#333;
        font-size: 14px;
        // letter-spacing: .03em;
        line-height: 1.5;
      }
    }

    &.line3 {
      color:#777;

      .sellCount {
        &:before {
          content:"月销量";
          padding-right: .3em;
        }
      }
    }
  }
  }
</style>
