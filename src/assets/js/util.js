// 函数节流
// debounce属于装饰器,装饰器可以给原函数增加功能
// 在这里的debounce装饰器的作用是：如果某一段时间内(默认200毫秒, 由delay参数决定)调用多次debounce(func), 它不会即时响应, 而总是延迟200毫秒。当某次debounce(func)调用后，200毫秒内debounce(func)没有被再次调用，则执行函数
export const debounce = (func, delay = 200) => {
  let timer = null

  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
      // func.call(this, ...arguments)
    }, delay)
  }
  // 这里的...是剩余参数语法（rest），意思是在函数传入的所有参数中，除了...之前的参数，其他参数都push到名为args的数组中
  // return function (...args) {
  //   timer && clearTimeout(timer)
  //   timer = setTimeout(() => {
  //     func.apply(this, args)
  //   }, delay)
  // }
}
