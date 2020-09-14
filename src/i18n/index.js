import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhLocale from './zh.js'
import enLocale from './en.js'
import koLocale from './ko.js'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  },
  ko: {
    ...koLocale
  }
}

const i18n = new VueI18n({
  messages
})

export default i18n