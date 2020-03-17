const storage = window.localStorage

export default {
  set (key, val) {
    if (val === undefined) {
      return
    }
    storage.setItem(key, serialize(val))
  },
  get (key, def) {
    const val = deserialize(storage.getItem(key))
    return val === undefined ? def : val
  },
  remove (key) {
    storage.removeItem(key)
  },
  clear () {
    storage.clear()
  }
}

// 把Json转化为字符串
function serialize (val) {
  return JSON.stringify(val)
}

// 把字符串转化为Json格式
function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}
