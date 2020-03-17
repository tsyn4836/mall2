import axios from 'axios'
import { SUCC_CODE, TIMEOUT } from './config'

// cancel用来接收一个取消方法
let cancel
// 获取内容数据--ajax
export const getCategoryContent = (id) => {
  // 执行本请求前总是取消上一次的请求
  // 至于能不能成功取消，我也不知道
  // 如果上一次请求取消成功了，就抛出提示；没有取消，就没有提示
  cancel && cancel('取消了前一次的请求！')
  // cancel = null
  // 开始进行本次请求
  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new axios.CancelToken(function executor (c) {
      // 每次发送请求，都会把当前请求取消的方法赋值给cancel
      cancel = c
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      console.log('成功获取到数据！')
      return res.data.content
    }
    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    // if语句只捕获属于取消请求的信息
    if (axios.isCancel(err)) {
      console.log(err.message)
    } else {
      // else语句捕获其他的错误
      console.log(err)
    }
  })
}
