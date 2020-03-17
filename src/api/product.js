import jsonp from 'assets/js/jsonp'
import { jsonpOptions } from './config'

export const getProductDetils = id => {
  const url = 'https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/'
  const params = {
    api: 'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId":"${id}"}`,
    appkey: 12574478,
    dataType: 'jsonp',
    type: 'jsonp',
    v: '6.0'
  }

  return jsonp(url, params, jsonpOptions).then(res => {
    res = res.data
    if (res.apiStack && res.item) {
      const apiStack = JSON.parse(res.apiStack[0].value)
      const data = {}

      // 轮播图
      data.sliders = res.item.images
      // 商品基本信息
      data.baseInfo = {}
      data.baseInfo.price = apiStack.price.price.priceText
      data.baseInfo.soldCount = apiStack.vertical.jhs.soldCount
      data.baseInfo.title = apiStack.item.title
      data.baseInfo.postage = apiStack.delivery.postage
      data.baseInfo.sellCount = apiStack.item.sellCount
      data.baseInfo.from = apiStack.delivery.from
      // 买家评价
      if (res.rate) {
        data.review = {}
        data.review.totalCount = res.rate.totalCount
        data.review.keywords = res.rate.keywords
        data.review.rateList = res.rate.rateList
      }
      // 卖家信息
      if (res.seller) {
        data.seller = {}
        data.seller.shopIcon = res.seller.shopIcon
        data.seller.shopName = res.seller.shopName
        data.seller.creditLevelIcon = res.seller.creditLevelIcon
        data.seller.evaluates = res.seller.evaluates
      }
      return data
    }

    throw new Error('没有成功获取到数据！')
    // // 手动延迟1秒
    // }).then(res => {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       // console.log(res)
    //       resolve(res)
    //     }, 1000)
    //   })
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}
