<template>
  <div class="review">
    <!-- 商品评价总数 -->
    <h3 class="totalCount">商品评价 ({{ review.totalCount }})</h3>

    <!-- 评价关键词 -->
    <ul class="keywords">
      <li v-for="(item, index) in review.keywords" :key="index" class="keyword">
        {{ item.word }}({{ item.count }})
      </li>
    </ul>

    <!-- 评价列表 -->
    <ul class="rateList">
      <li v-for="(item, index) in review.rateList" :key="index" class="rate">
        <!-- 用户 -->
        <div class="user">
          <img class="avatar" :src="item.headPic" alt="avatar" />
          <span class="userName">{{ item.userName }}</span>
        </div>
        <!-- 评价内容 -->
        <div class="content">
          {{ item.content }}
        </div>
        <!-- 日期和分类 -->
        <div class="dateAndSku">
          <span class="dateTime">{{ item.dateTime }}</span>
          <span class="skuInfo">{{ item.skuInfo }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductReview',
  props: {
    review: {
      type: Object
    }
  }
  // mounted () {
  //   console.log('review', this.review)
  // }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .review {
    background-color: #fff;
    padding: 5px 10px;
    .totalCount {
      font-size: 16px;
      padding: 5px 0;
    }
    .keywords {
      @include flex-start();
      flex-wrap: wrap;
      .keyword {
        padding: 7px;
        margin: 5px;
        border-radius: 5px;
        background-color: #f3d7d7;
      }
    }
    .rateList {
      .rate {
        margin-top: 15px;
      }
      .user {
        @include flex-start();
        margin-bottom: 10px;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .content {
        @include multiline-ellipsis(2);
        margin-bottom: 10px;
        line-height: 1.5;
      }
      .dateAndSku {
        color: #999;
        line-height: 1.5;
        @include flex-start();
        flex-wrap: wrap;
        .dateTime {
          margin-right: 15px;
        }
      }
    }
  }
</style>
