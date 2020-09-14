import axios from 'axios'
import Vue from 'vue'
import session from '@/utils/session' // 引入sessiontorage组件
import { Message } from 'element-ui'

// 设置接口路径
const url = process.env.NODE_ENV === 'development' ? 'localhost' : 'localhost' // 线上

let http = axios.create({
  baseURL: url,
  timeout: 8000, // 请求延时时间
  responseType: 'json', // 请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  params: {} // 无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
})
console.log('当前环境是：' + process.env.NODE_ENV)

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    let token = session.get('token')
    if (token) {
      config.headers.Authorization = token // 将token设置成请求头
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  res => {
    // 接口报错统一拦截
    let { status, msg } = res.data
    if (status === 1) {
      Message.error(msg)
    }
    return res
  },
  error => {
    if (error && error.response) {
      let { status } = error.response.data
      if (status === 400) {
        Message.error('服务异常')
      }
      if (status === 404) {
        Message.error('页面请求地址错误')
      }
      if (status === 500) {
        Message.error('服务异常')
      }
      if (status === 'canceled') {
        Message.error('服务异常')
      }
    }
    // 对响应错误做点什么
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      Message.error('请求超时')
    }
    return Promise.reject(error)
  }
)

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false

Vue.prototype.$api = {
  // 登录
  loginxxx: params => { return http.get(`/user/queryUser`, { params: params }) },

  // docker 查询
  queryDockerxxx: params => { return http.get(`/docker/queryDocker`, { params: params }) },

  // docker 创建
  addDockerxxx: params => { return http.post(`/docker/saveDocker`, params) },

  // docker 删除
  deleteDockerxxx: params => { return http.delete(`/docker/deleteDocker`, { params: params }) },

  // 客户查询
  queryCustomerxxx: params => { return http.get(`/customer/queryCustomer`, { params: params }) },

  // 创建客户
  createCustomer: params => { return http.post(`/customer/saveCustomer`, params) },

  // 客户编辑
  updateCustomer: params => { return http.put(`/customer/updateCustomer`, params) }
}