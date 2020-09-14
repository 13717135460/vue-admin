/*
*  localStorage 存储
*/
const local = {}

// 数据存储到本地缓存
local.set = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 获取本地缓存数据
local.get = function (key) {
  let obj = window.localStorage.getItem(key)
  if (obj && obj !== undefined && obj !== null) {
    return JSON.parse(obj)
  }
  return ''
}

// 清除本地缓存数据
local.remove = function (key) {
  if (key) {
    window.localStorage.removeItem(key)
  } else {
    for (var i in arguments) {
      window.localStorage.removeItem(arguments[i])
    }
  }
}

// 检查本地缓存是否有值
local.seek = function (name) {
  if (!name) return
  return window.localStorage.hasOwnProperty(name)
}

export default local