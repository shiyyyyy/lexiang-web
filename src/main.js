// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入字体图标
import 'common/fonts/font_634091_15kv05sf9gj5rk9/iconfont.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false

const Bus = new Vue()
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
