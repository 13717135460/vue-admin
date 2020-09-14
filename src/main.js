import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import * as filters from './filters'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import i18n from './i18n'
import uploader from 'vue-simple-uploader'
import VueQuillEditor from 'vue-quill-editor'// 用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import './assets/iconfonts/iconfont.css' // 引入字体图标库

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(Vuex)
Vue.use(uploader)

Vue.use(ElementUI, {
  I18n: (key, value) => i18n.t(key, value)
})

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  // el: '#app',
  // template: '<App/>',
  router,
  store,
  i18n,
  // components: { App }
  render: h => h(App)
}).$mount('#app')

