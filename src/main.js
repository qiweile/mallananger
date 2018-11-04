import Vue from 'vue'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import myBracn from '@/components/my-bracn'
import http from '@/assets/http.js'
Vue.use(ElementUI)
Vue.use(http)
Vue.config.productionTip = false
Vue.filter('fmtDate', (value) => {
  return moment(value).format('YYYY-MM-DD hh:mm:ss')
})
Vue.component(myBracn.name, myBracn)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
