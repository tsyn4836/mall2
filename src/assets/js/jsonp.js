import jsonp from 'jsonp'

// 把对象转换为字符串，形式如 a=1&b=2&c=3
const parseParam = obj => {
  const params = []

  for (const key in obj) {
    params.push([key, encodeURIComponent(obj[key])])
  }
  return params.map(value => value.join('=')).join('&')

  // let str = ''
  // for (let [key, value] of Object.entries(obj)) {
  //   str += `&${key}=${encodeURIComponent(value)}`
  // }
  // return str.slice(1)
}

export default (url, data, options) => {
  const urlWithData = url + (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data)

  return new Promise((resolve, reject) => {
    jsonp(urlWithData, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
