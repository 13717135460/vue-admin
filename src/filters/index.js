// 全局过滤器

// 金额保留2位小数
let formatMoney = function (value) {
  return '￥' + value.toFixed(2)
}

// 千分位分割
let thousands = function (value) {
  if (typeof (value) === 'number') {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
}

// 绑定状态
let bindStatus = function(value) {
  switch (value) {
    case 0: return '未下发'
    case 1: return '已下发'
    case 2: return '绑定成功'
    case 3: return '绑定失败'
    default: return '未知'
  }
}

// 银行卡4位分隔符
let bankFormat = function (value) {
  value += ''
  value = value.replace(/(\s)/g, '').replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '')
  return value
}

// 隐藏手机号中间四位
let hidePhone = function (phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export { formatMoney, thousands, bindStatus, bankFormat, hidePhone }