import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import { message } from 'ant-design-vue'
import '@/mock'

Vue.config.productionTip = false

Vue.prototype._ = _
Vue.prototype.$message = message
Vue.prototype.$bus = new Vue()

Vue.use(Antd)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
