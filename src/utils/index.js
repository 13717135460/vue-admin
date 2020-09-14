
/**
 * author:wangxinyan
 * Validation tool
 */
// 邮箱
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

// 邮编
export function isPostcode (s) {
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(s)
}

// 手机号码
export function isPhone (s) {
  return /^1[0-9]{10}$/.test(s)
}

// 是否座机号码
export function isFixedphone (s) {
  return /^\d{3}-\d{8}|\d{4}-\d{7}$/g.test(s)
}

// URL地址
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

// 身份证
export function isIdCard (s) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s)
}

// 是否是移动端
export function isMobile() {
  var u = navigator.userAgent.toLowerCase()
  return !!u.match(/AppleWebKit.*Mobile.*/)
}

// 是否微信环境
export function isWX () {
  var u = navigator.userAgent.toLowerCase()
  return u.toLowerCase().indexOf('micromessenger') !== -1
}

// 是否是IP地址
export function isIp (s) {
  var res = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/ // 正则表达式
  if (res.test(s)) {
    if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true
  }
  return false
}

// 统一社会信用代码 (营业执照)
export function isLicense (s) {
  return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(s)
}

// 是否迅雷链接
export function isThunderLink (s) {
  return /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(s)
}

// 手机机身吗(IMEI)
export function isIMEI (s) {
  return /^\d{15,17}$/.test(s)
}

// 密码强度
export function checkPwd (s) {
  var lvl = 0
  if (s.match(/[0-9]/)) {
      lvl++
  }
  if (s.match(/[a-zA-Z]/)) {
      lvl++
  }
  if (s.match(/[^0-9a-zA-Z]/)) {
      lvl++
  }
  if (s.length < 6) {
      lvl--
  }
  return lvl
}

// 获取指定范围内随机数
export function getRandomNumber (min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min
  return num
}

// 车牌号(新能源+非新能源)
export function isCarNumber (s) {
  return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(s)
}

/**
 * 火车车次校验
  G—— 高铁
  D——动bai车组列车—du—简称：动车
  Z——直达特快旅客列车——简zhi称：直特
  T——特快dao旅客列车——简称：特
  K——快速旅客列车(跨局)——简称：快
  N——快速旅客列车(管内)——简称：内
  L——临时旅客列车(跨局)——简称：临
  A——临时旅客列车(管内)——简称：临A
  Y——旅游列车——简称：游
  X——行包专列——简称：行
 * */
export function isTrainNumber (s) {
  return /^(G|C|D|Z|S|T|K|D|X|P|L|\d{1})\d{1,4}$/.test(s)
}

// 转换日期为yyyy-MM-dd HH:mm:ss字符串
export function dateFormat(fmt, date) {
  let ret
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'MM+': (date.getMonth() + 1).toString(), // 月
    'dd+': date.getDate().toString(), // 日
    'hh+': date.getHours().toString(), // 时
    'mm+': date.getMinutes().toString(), // 分
    'ss+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(" + k + ")').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

// 统计数组中各个元素出现的次数
export function staArrNum (arr) {
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    let m = arr[i]
    if (obj.hasOwnProperty(m)) {
      obj[m] += 1
    } else {
      obj[m] = 1
    }
  }
  return obj
}
//  测试数据
// let arr = [1, 2, 3, 6, 5, 3, 2, 1, 2, 3, 2, 1]
// console.log(staArrNum(arr));  //    { '1': 3, '2': 4, '3': 3, '5': 1, '6': 1 }

// 获取视口宽高尺寸
export function getViewportOffset () {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    }
  } else {
    // ie8及其以下
    if (document.compatMode === 'BackCompat') {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight
      }
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
  }
}

// 函数防抖
export function Debounce(func, waits, immediate) {
  let wait = waits || 500
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

// 函数节流
export function Throttle(fn, t) {
  let last
  let timer
  let interval = t || 500
  return function () {
    let args = arguments
    let now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}