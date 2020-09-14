const session = {}

// 数据存储到本地缓存
session.set = function (key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

// 获取本地缓存数据
session.get = function (key) {
  let obj = window.sessionStorage.getItem(key)
  if (obj && obj !== undefined && obj !== null) {
    return JSON.parse(obj)
  }
  return ''
}

// 清除本地缓存数据
session.remove = function (key) {
  if (key) {
    window.sessionStorage.removeItem(key)
  } else {
    for (var i in arguments) {
      window.sessionStorage.removeItem(arguments[i])
    }
  }
}

// 检查本地缓存是否有值
session.seek = function (name) {
  if (!name) return
  return window.sessionStorage.hasOwnProperty(name)
}

export default session